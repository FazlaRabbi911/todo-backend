import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDto{
    @ApiProperty({example:'Abm shawon islam', description:'The name of the user'})
    @IsNotEmpty()
    @IsString()
    username:string;
    @ApiProperty({example:'Email', description:'This is the email of user'})
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;
    @ApiProperty({example:'password123',description:'The password of user'})
    @IsNotEmpty()
    @IsString()
    password:string
}