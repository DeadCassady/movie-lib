
import { Injectable } from "@nestjs/common";
import { symlink, writeFile } from "fs";
import { ensureDir, remove } from "fs-extra";
import path, { join } from "path";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorage {
  private readonly uploadDir = './private/uploads'
  private readonly publicDir = './public/images'


  async saveFile(file: Express.Multer.File): Promise<{ filename: string; originalName: string }> {
    ensureDir(this.uploadDir); // Створити папку, якщо її немає

    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
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
