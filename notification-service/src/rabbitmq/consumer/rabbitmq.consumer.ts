import { Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQConnection } from "./../rabbitmq.connection";

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  constructor(private rabbitConnection: RabbitMQConnection) {}

  async onModuleInit() {
    const channel = await this.rabbitConnection.getChannel();

    await channel.assertExchange("notification_exchange", "fanout", {
      durable: true,
    });

    await channel.assertQueue("notification_queue", { durable: true });

    await channel.bindQueue(
      "notification_queue",
      "notification_exchange",
      ""
    );

    channel.consume(
      "notification_queue",
      (msg: any) => {
        if (!msg) return;

        const content = msg.content.toString();
        console.log("Message Received:", content);

        channel.ack(msg);
      },
      { noAck: false }
    );
  }
}
