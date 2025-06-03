import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateNoteDto {
    @ApiProperty({ example: 'Note title', description: 'The title of the note', required: false })
    @IsOptional()
    @IsString()
    title?: string;
    @ApiProperty({example:'Note content', description:'The content of the note'})
    @IsString()
    @IsNotEmpty()
    content:string;

}