import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { RabbitMQConnection } from "../rabbitmq.connection";
import { RabbitMQPublisher } from "./rabbitmq.publisher";
import { UserOutbox } from "../../enitites/userOutbox.entity";
import { PublishCommand } from "../cli/publish.command";
import { config } from 'dotenv'

config()

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserOutbox],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserOutbox]),
  ],
  providers: [RabbitMQConnection, RabbitMQPublisher, PublishCommand],
})
export class ProducerModule {}
