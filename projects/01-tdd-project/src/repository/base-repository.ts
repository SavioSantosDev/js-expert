import { readFile } from 'fs/promises';
import { Base } from '../models';

export interface BaseRepositoryDto {
  filePath: string;
}

export class BaseRepository<T extends Base> implements BaseRepositoryDto {
  filePath!: string;

  constructor(baseRepository: BaseRepositoryDto) {
    Object.assign(this, baseRepository);
  }

  async findAll(): Promise<T[]> {
    return JSON.parse((await readFile(this.filePath)).toString());
  }

  async findById(id: string): Promise<T | undefined> {
    return (await this.findAll()).find((item) => item.id === id);
  }
}
