# nestjs-typeorm3-kit

[![npm](https://img.shields.io/npm/v/nestjs-typeorm3-kit)](https://www.npmjs.com/package/nestjs-typeorm3-kit) ![MIT License](https://img.shields.io/npm/l/nestjs-typeorm3-kit.svg)

## [Node.js] nestjs-typeorm3-kit

### Installation

#### NPM

```bash
npm install nestjs-typeorm3-kit typeorm-transactional
```

#### Yarn

```bash
yarn add nestjs-typeorm3-kit typeorm-transactional
```

#### pnpm

```bash
pnpm add nestjs-typeorm3-kit typeorm-transactional
```

#### bun

```bash
bun add nestjs-typeorm3-kit typeorm-transactional
```

### Config after install

#### Use @DefEntityRepository

For using `@DefEntityRepository` instead of `@EntityRepository` of typeorm 0.2, you need to add the following code in `main.ts` or `app.module.ts`:

```typescript
import { TypeOrmModule } from "@nestjs/typeorm";

TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Abc12345",
    database: "primary_db",
    entities: [join(__dirname, "./domains/primary/**/*.entity.{ts,js}")],
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 2,
    retryDelay: 1000,
  }),
  dataSourceFactory: async (options: DataSourceOptions) => {
    if (!options) {
      throw new Error("Invalid options passed");
    }
    return addTransactionalDataSource({
      dataSource: new DataSource(options),
      name: PRIMARY_CONNECTION,
    });
  },
});
```

#### create Repository module Use @DefRepositoryModule

```typescript
import { Module } from "@nestjs/common";
import { join } from "path";

import { PRIMARY_CONNECTION } from "~/common/constants";
import { DefRepositoryModule } from "nestjs-typeorm3-kit";
@Module({
  imports: [
    DefRepositoryModule.forRootAsync({
      useFactory: () => ({
        globPattern: join(__dirname, "./**/*.repo.{ts,js}"),
        dataSource: PRIMARY_CONNECTION,
      }),
    }),
  ],
  exports: [DefRepositoryModule],
})
export class PrimaryRepoModule {}
```

or

```typescript
import { Module } from "@nestjs/common";
import { join } from "path";

import { PRIMARY_CONNECTION } from "~/common/constants";
import { DefRepositoryModule } from "nestjs-typeorm3-kit";
@Module({
  imports: [
    DefRepositoryModule.forFeature([BookRepo, PhotoRepo], PRIMARY_CONNECTION),
  ],
  exports: [DefRepositoryModule],
})
export class PrimaryRepoModule {}
```

#### Example

[Example](./example)

### Full document in wiki github

[FULL DOCUMENT](https://x302502.github.io/nestjs-typeorm3-kit/)
