import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { getFromContainer, MetadataStorage } from "class-validator";
import {
  OpenAPIObject,
  SchemasObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export const configSwaggerDocument = (
  app: INestApplication,
  document: OpenAPIObject,
  swaggerPath: string = "swagger"
) => {
  // Creating all the swagger schemas based on the class-validator decorators
  const metadatas = (getFromContainer(MetadataStorage) as any)
    .validationMetadatas;
  const targetSchemas = document.components.schemas || {};
  const schemasBinding = validationMetadatasToSchemas(metadatas) || {};

  Object.keys(schemasBinding).forEach((key) => {
    const value = schemasBinding[key] as SchemasObject;
    if (!targetSchemas[key]) {
      Object.assign(targetSchemas, { key: value });
    } else {
      const targetValue = targetSchemas[key] as SchemasObject;

      Object.assign(targetValue.properties, value.properties);
      targetValue.required = value.required;
      Object.assign(targetSchemas, { key: targetValue });
    }
  });
  document.components.schemas = Object.assign({}, targetSchemas);
  SwaggerModule.setup(swaggerPath, app, document);
};
