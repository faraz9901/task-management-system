import { ExposeApiProperty } from "@/decorators/expose-api-property.decorator";
import { IsString } from "class-validator";

export class LoginResponseDto {
    @IsString()
    @ExposeApiProperty({ example: 'example-token' })
    token: string;
}