import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entity/Note.entity';
import { Repository } from 'typeorm';
import { NoteDto } from './dto/note.dto';
import { User } from 'src/entity/User.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository (Note) private noteRepository :  Repository<Note>,
        @InjectRepository (User) private userRepository :  Repository<User>
    ){}
    async createNote(noteDto: NoteDto, userId: number){
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
             throw new NotFoundException('Note not found');
        }
        const newNote = this.noteRepository.create({
            ...noteDto,
            user: user,
        });
        return await this.noteRepository.save(newNote);
    }
    async getAllNotes(userId: number){
        console.log('userId:', userId);
        return this.noteRepository.find({
             where: { user: { id: userId } } });
    }
    async deleteNote(id: string, userId: number) {
        const note = await this.noteRepository.findOne({
            where: {
                id: +id, // make sure it's a number
                user: { id: userId }
            },
        });
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return this.noteRepository.remove(note);
    }
    async getNoteById(id: string, userId: number) {
        const note = await this.noteRepository.findOne({
          where: {
                id: +id, // make sure it's a number
                user: { id: userId }
            },
            });
        if (!note) {
             throw new NotFoundException('Note not found');
        }
        return note;
    }
    async updateNote(id: string, noteDto: NoteDto, userId: number) {
            const note = await this.noteRepository.findOne({
            where: {
                id: +id, // make sure it's a number
                user: { id: userId }
            },
            });
        if (!note) {
             throw new NotFoundException('Note not found');
        }

        Object.assign(note,noteDto)
        return this.noteRepository.save(note);
    }
}
