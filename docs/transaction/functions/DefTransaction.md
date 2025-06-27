[**nestjs-typeorm3-kit**](../../README.md)

***

[nestjs-typeorm3-kit](../../README.md) / [transaction](../README.md) / DefTransaction

# Function: DefTransaction()

> **DefTransaction**(`options?`): `MethodDecorator`

Defined in: [src/transaction/decorator/index.ts:8](https://github.com/x302502/nestjs-typeorm3-kit/blob/313e27f27be24cb76b799a33cc27551fc0070682/src/transaction/decorator/index.ts#L8)

Transactional decorator

## Parameters

### options?

#### connectionName?

`string` \| () => `string`

#### isoLevel?

`"READ_UNCOMMITTED"` \| `"READ_COMMITTED"` \| `"REPEATABLE_READ"` \| `"SERIALIZABLE"`

#### propagation?

`Propagation`

## Returns

`MethodDecorator`
