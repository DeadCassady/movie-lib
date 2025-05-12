import { Controller, Delete, HttpStatus, Param, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileStorage } from "./services/file-storage.service";
import { ImageService } from "./services/image.service";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";

@Controller('images')
export class ImagesController {
  constructor(
    private readonly fileStorage: FileStorage,
    private readonly imageService: ImageService
  ) { }
  @Post(':entityType/:entityId/upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 100000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File,
    @Param('Entity type') entityType: string,
    @Param('Entity Id') entityName: string
  ) {
    const { filename, originalName } = await this.fileStorage.saveFile(file)
    await this.fileStorage.saveFileToS3(filename, file.buffer)

    const symlinkPath = await this.fileStorage.createSymlink(filename)

    return this.imageService.create(
      {
        filename,
        originalName,
        path: symlinkPath,
        entityType: entityType,
        entityName: entityName,
      }
    )

  }

  @Delete(':id')
  async deleteImage(@Param('id') id: number) {
    const image = await this.imageService.findOne(id);
    await this.fileStorage.deleteFile(image.filename);
    await this.imageService.remove(id);
    return { message: 'Image deleted' };
  }
}
