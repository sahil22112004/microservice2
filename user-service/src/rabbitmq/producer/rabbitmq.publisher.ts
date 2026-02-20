import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RabbitMQConnection } from "../rabbitmq.connection";
import { UserOutbox, orderStatus } from "../../enitites/userOutbox.entity";

@Injectable()
export class RabbitMQPublisher {
  constructor(
    @InjectRepository(UserOutbox)
    private userOutboxRepo: Repository<UserOutbox>,
    private rabbitConnection: RabbitMQConnection
  ) {}

  async publishPendingMessages() {
    const channel = await this.rabbitConnection.getChannel();

    await channel.assertExchange("notification_exchange", "fanout", {
      durable: true,
    });

    const pendingMessages = await this.userOutboxRepo.find({
      where: { status: orderStatus.pending },
    });

    for (const msg of pendingMessages) {
      const payload = {
        messageId: msg.id,
        message: msg.payload,
      };

      channel.publish(
        "notification_exchange",
        "",
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
      );

      msg.status = orderStatus.published;
      await this.userOutboxRepo.save(msg);
    }
  }
}
