import { applyDecorators } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export const Optional = () => applyDecorators(
    IsOptional(),
    Transform(({ value }) => (value === null || value === undefined ? undefined : value)),
);