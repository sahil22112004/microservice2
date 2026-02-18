import { Module } from "@nestjs/common";
import { RabbitMQConnection } from "../rabbitmq.connection";
import { RabbitMQConsumer } from "./rabbitmq.consumer";

@Module({
  providers: [RabbitMQConnection, RabbitMQConsumer],
})
export class ConsumerModule {}
