import { INestApplication, ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerInfoInterface } from "./interfaces/swagger-info.interface";

export async function sharedMain(
  app: INestApplication<any>, 
  kafkaConsumerGroupId?: string, 
  swaggerInfo?: SwaggerInfoInterface
): Promise<void> {
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  if(swaggerInfo) {
    const config = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .setVersion('1.0')
    .addTag(swaggerInfo.tag)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documents', app, document);
  }

  if(kafkaConsumerGroupId) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: kafkaConsumerGroupId,
          allowAutoTopicCreation: true
        },
      }
    });
    
    await app.startAllMicroservices();
  }
}
