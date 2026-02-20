import { Command, CommandRunner } from "nest-commander";
import { RabbitMQPublisher } from "../producer/rabbitmq.publisher";

@Command({
  name: "dispatch",
  description: "run publisher",
})
export class PublishCommand extends CommandRunner {
  constructor(private publisher: RabbitMQPublisher) {
    super();
  }
  async run(): Promise<void> {
    await this.publisher.publishPendingMessages();
  }
}
