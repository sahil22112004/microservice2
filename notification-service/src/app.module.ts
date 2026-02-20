import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { config } from "dotenv";
import { NotificationInbox } from "./entites/notificationInbox.entity";
import { RabbitMQConsumer } from "./rabbitmq/consumer/rabbitmq.consumer";
import { RabbitMQConnection } from "./rabbitmq/rabbitmq.connection";

config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [NotificationInbox],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([NotificationInbox]),
  ],
  controllers: [AppController],
  providers: [AppService,
    // RabbitMQConnection, RabbitMQConsumer
  ],
})
export class AppModule { }
