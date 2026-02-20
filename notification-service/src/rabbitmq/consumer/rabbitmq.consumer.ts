import { Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQConnection } from "./../rabbitmq.connection";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationInbox } from "../../entites/notificationInbox.entity";

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  constructor(
    @InjectRepository(NotificationInbox) private notificationInboxRepo: Repository<NotificationInbox>,
    
    private rabbitConnection: RabbitMQConnection) {}

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
      async (msg: any) => {
        if (!msg) return;

        const content = msg.content.toString();
        const data = JSON.parse(content);
        console.log("Message id:", data.messageId);
        console.log("Message id:", data.message);
        const inboxData ={
          id:data.messageId,
          message:data.message
        }
        const Inbox=  this.notificationInboxRepo.create(inboxData)
        await this.notificationInboxRepo.save(Inbox)

        channel.ack(msg);
      },
      { noAck: false }
    );
  }
}
