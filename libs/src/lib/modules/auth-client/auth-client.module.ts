import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-client',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'auth-service-consumers',
            allowAutoTopicCreation: true
          },
        }
      }
    ]),
  ],
  providers: [AuthClientService],
  exports: [AuthClientService],
})
export class AuthClientModule {}
