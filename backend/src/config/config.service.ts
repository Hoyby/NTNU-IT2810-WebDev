import * as dotenv from 'dotenv';
import * as fs from 'fs';

type EnvConfig = {
  [key: string]: string;
};


export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = (config)}

  get(key: string): string {
    return this.envConfig[key];
  }
}
