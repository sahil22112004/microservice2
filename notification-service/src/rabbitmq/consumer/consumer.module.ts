import { Module } from "@nestjs/common";
import { RabbitMQConnection } from "../rabbitmq.connection";
import { RabbitMQConsumer } from "./rabbitmq.consumer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationInbox } from "../../entites/notificationInbox.entity";
import { consumeCommand } from "../cli/consumer.command";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
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
  providers: [RabbitMQConnection, RabbitMQConsumer,consumeCommand],
})
export class ConsumerModule {}
