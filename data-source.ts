import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'my_db',
  migrations: ['dist/src/database/migrations/*.js'], // Asegúrate de compilar tus migraciones a .js
  entities: ['dist/**/*.entity.js'],
   // También compila tus entidades a .js
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
