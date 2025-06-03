import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private JwtService:JwtService
    ){}
    async register(userRegisterDto:UserRegisterDto): Promise<{ access_token: string; refresh_token: string; user: { email: string; username: string; sub: any } }>{
        const {username, email,password}  = userRegisterDto
        const existingUser = await this.userRepository.findOne({where:{email}})
        if(existingUser){
            throw new Error('User already exists with this email')
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
        const newUser = this.userRepository.create({
            username: username,
            email :email,
            password:hashedPassword,
            refreshToken: uuidv4() // Generate a unique refresh token
        })
        await this.userRepository.save(newUser)
        const payload ={
            email: newUser.email,
            username: newUser.username,
            sub:newUser.id
        }
        return{
            access_token : this.JwtService.sign(payload),
            refresh_token: this.JwtService.sign(payload, {expiresIn:'7d'}),
            user:{
                ...payload
            }
        }

    }
    async login(userLoginDto:UserLoginDto):Promise<{ access_token: string; refresh_token: string; user: { email: string; username: string; sub: any } }> {
        const {email, password}= userLoginDto;
        const user = await this.userRepository.findOne({where:{email}})
        if(!user){
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid password');
        const payload ={
            email : user.email,
            username:user.username,
            sub:user.id
        }
        return{
            access_token: this.JwtService.sign(payload),
            refresh_token: this.JwtService.sign(payload, { expiresIn: '7d' }), // Refresh token valid for 7 days
            user:{
                ...payload
            }
        }

    }
}
