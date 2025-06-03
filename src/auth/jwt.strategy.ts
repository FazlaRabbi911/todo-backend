import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/User.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'very_strong_secret_key',
        })
    }
    async validate(payload:any){
        const user = await this.userRepository.findOne({where:{id:payload.sub}})
        if(!user){
            throw new Error('User not found');
        }
        return {
            userId :user.id,
            username: user.username,
            email: user.email
        }
    }

}