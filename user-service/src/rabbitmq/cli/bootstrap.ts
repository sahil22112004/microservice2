import { CommandFactory } from "nest-commander";
import { ProducerModule } from "../producer/producer.module";
import { config } from "dotenv";

async function bootstrap() {
  config();
  await CommandFactory.run(ProducerModule, ["warn", "error"]);
}

bootstrap();
