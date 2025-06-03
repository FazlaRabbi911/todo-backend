import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entity/Note.entity';
import { User } from 'src/entity/User.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Note,User])
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
