import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { stringToBoolean } from '~/utils/parser.util';

export class DatabaseConfig {
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  ssl: boolean;
  sslRejectUnauthorized: boolean;
  entities: string[];
}

export const initConnection = ({
  name,
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
  ssl,
  sslRejectUnauthorized,
  entities = [],
}) => {
  if (!type) {
    throw new Error('TYPE is required');
  }
  if (type === 'postgres') {
    /**
     * Config database Postgres
     */
    return TypeOrmModule.forRootAsync({
      name: name,
      useFactory: () => ({
        type: 'postgres',
        host,
        port: Number(port),
        username,
        password,
        database,
        synchronize: stringToBoolean(synchronize),
        ssl: stringToBoolean(ssl)
          ? { rejectUnauthorized: stringToBoolean(sslRejectUnauthorized) }
          : undefined,
        entities,
        logging: [
          'log',
          'error',
          'info',
          // "query"
        ],
        // logger: 'simple-console',
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    });
  }
  if (type === 'mssql') {
    /**
     * Config database MSSQL
     */
    return TypeOrmModule.forRootAsync({
      name,
      useFactory: () => ({
        type: 'mssql',
        host,
        port: Number(port),
        username,
        password,
        database,
        synchronize: stringToBoolean(synchronize),
        options: { encrypt: false },
        entities,
        logging: [
          'log',
          'error',
          'info',
          // "query"
        ],
        // logger: 'simple-console',
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    });
  }
  if (type === 'mysql') {
    /**
     * Config database MySQL
     */
    return TypeOrmModule.forRootAsync({
      name,
      useFactory: () => ({
        type: 'mysql',
        host,
        port: Number(port),
        username,
        password,
        database,
        synchronize: stringToBoolean(synchronize),
        entities,
        logging: [
          'log',
          'error',
          'info',
          // "query"
        ],
        // logger: 'simple-console',
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    });
  }
};
