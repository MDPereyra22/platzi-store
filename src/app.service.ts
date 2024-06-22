import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService : ConfigType<typeof config>
  ) {}
  getHello(): string {

    const db = this.configService.database.name
    const apiKey = this.configService.apiKey

    return `This is the API KEY:${apiKey} and db: ${db}`;
  }

  newEndpoint() {
    return 'Yo soy nuevo';
  }
}
