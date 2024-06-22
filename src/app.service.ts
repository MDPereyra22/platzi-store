import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private clientPg: Client,
  ) {}
  getHello(): string {
    const db = this.configService.database.name;
    const apiKey = this.configService.apiKey;

    return `This is the API KEY:${apiKey} and db: ${db}`;
  }

  getTasks() {
    return new Promise((resolve, rejects) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if(err){
          rejects(err)
        }
        resolve(res.rows);
      });
    });
  }
}
