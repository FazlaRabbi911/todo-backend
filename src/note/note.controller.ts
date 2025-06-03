import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
import { jwtAuthGuard } from 'src/jwt-auth.guard';
import { UpdateNoteDto } from './dto/updateNode.dto';

@Controller('note')
export class NoteController {
    constructor(private noteService:NoteService){}
    @UseGuards(jwtAuthGuard)
    @Post('create')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new note' })
    @ApiResponse({ status: 201, description: 'Note created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async CreateNote(@Body() noteDto:NoteDto,@Req() req: Request & { user?: any }) {
        const userId = req.user?.userId;
        return await this.noteService.createNote(noteDto, userId);
    }
    @Get('getAllNotes')
    @UseGuards(jwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all notes' })
    @ApiResponse({ status: 200, description: 'Notes retrieved successfully' })
    async GetAllNotes(@Req() req: Request & { user?: any }) {
        const userId = req.user?.['userId'];
        return await this.noteService.getAllNotes(userId);
    }
    @Delete('delete:id')
    @UseGuards(jwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a note by ID' })
    @ApiResponse({ status: 200, description: 'Note deleted successfully' })
    @ApiResponse({ status: 404, description: 'Note not found' })
    async DeleteNote(@Param('id') id:string,@Req() req: Request & { user?: any }) {
        const userId = req.user?.['userId'];
        return await this.noteService.deleteNote(id, userId);
    }
    @Get('getbyid:id')
    @UseGuards(jwtAuthGuard)
    @ApiBearerAuth()    
    @ApiOperation({ summary: 'Get a note by ID' })
    @ApiResponse({ status: 200, description: 'Note retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Note not found' })
    async GetNoteById(@Param('id') id:string, @Req() req: Request & { user?: any }) {
        const userId = req.user?.['userId']
        return await this.noteService.getNoteById(id, userId);
    }
    @Put('update/:id')
    @UseGuards(jwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a note by ID' })
    @ApiResponse({ status: 200, description: 'Note updated successfully' })
    @ApiResponse({ status: 404, description: 'Note not found' })
    async UpdateNote(@Param('id')id:string, @Body() updateNoteDto:UpdateNoteDto , @Req() req: Request & { user?: any }) {
        const userId = req.user?.['userId'];
        return await this.noteService.updateNote(id, updateNoteDto, userId);
    }
}
