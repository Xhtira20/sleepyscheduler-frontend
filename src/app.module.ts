import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
       inject: [ConfigService],
      
       useFactory: (configService: ConfigService) => ({
        /* postgress database configuration*/
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true, // Automatically load entities
        synchronize: true, // Auto-create DB schema (not for production)
        logging: true,
      }),
     }),
      UsersModule,// import user module for table creation
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
