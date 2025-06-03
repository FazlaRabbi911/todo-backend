import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){
    handleRquest(err: any, user: any, info: any){
        if (err || !user) {
            throw err || new UnauthorizedException('Unauthorized access');
        }
        return user
    }
}