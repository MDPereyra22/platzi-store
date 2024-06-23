import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { dataSourceOptions } from 'data-source';



const API_KEY = '12345';
const API_KEY_PROD = 'PROD123456';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, password, port, dBname } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dBname,
          password,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
