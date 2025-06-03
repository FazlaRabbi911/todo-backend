import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register')
    @ApiOperation({summary:'Resister a new user'})
    @ApiResponse({status:201, description:"user registered successfully"})
    @ApiResponse({status:400, description:'Bad request'})
    Register(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.register(userRegisterDto)
    }
    @Post('login')
    @ApiOperation({summary:'Resister a new user'})
    @ApiResponse({status:201, description:"user registered successfully"})
    @ApiResponse({status:400, description:'Bad request'})
    Login(@Body() userLoginDto :UserLoginDto){
        return this.authService.login(userLoginDto)
    }
}
