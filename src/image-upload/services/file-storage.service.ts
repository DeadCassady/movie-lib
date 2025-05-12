
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { symlink, writeFile } from "fs";
import { ensureDir, remove } from "fs-extra";
import path, { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

@Injectable()
export class FileStorage {

  private readonly uploadDir = './private/uploads'
  private readonly publicDir = './public/images'
  private client: S3Client
  private bucketName: string | undefined

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.getOrThrow('AWS_REGION')
    this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME')

    if (!s3_region) {
      throw new Error("aws region wasn't found in .env")
    }


    this.client = new S3Client({
      region: s3_region,
    })
  }


  async saveFileToS3(filename: string, file: Buffer) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
        Body: file,
      })
    )

  }

  async saveFile(file: Express.Multer.File): Promise<{ filename: string; originalName: string }> {
    ensureDir(this.uploadDir); // Створити папку, якщо її немає

    const filename = `${uuidv4()}${path}.jpeg`;
    const filePath = join(this.uploadDir, filename);

    writeFile(filePath, file.buffer, () => { }); // Зберегти файл

    return { filename, originalName: file.originalname };
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(this.uploadDir, filename);
    await remove(filePath); // Видалити файл
  }

  async createSymlink(filename: string): Promise<string> {
    ensureDir(this.publicDir);
    const symlinkPath = join(this.publicDir, filename);
    const targetPath = join(this.uploadDir, filename);

    symlink(targetPath, symlinkPath, () => { }); // Створити symlink
    return symlinkPath;
  }
}
