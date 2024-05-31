import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return <TypeOrmModuleOptions>{
          type: configService.get<string>('CONNECTION_TYPE'),
          host: configService.get<string>('CONNECTION_HOST'),
          port: configService.get<string>('CONNECTION_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          logging: ['query', 'error', 'log', 'info'],
          logger: 'simple-console'
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class SharedTypeormModule {
}
