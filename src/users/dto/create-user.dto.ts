import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  password: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  email: string;
}
