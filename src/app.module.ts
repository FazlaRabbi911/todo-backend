import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/User.entity';
import { NoteModule } from './note/note.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password:'(P)999biGblue##!##!',
      database: 'todo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Use this if you have multiple entities
      autoLoadEntities: true,
      synchronize:true,
    }),
    AuthModule,
    NoteModule
  ],

})
export class AppModule {}
