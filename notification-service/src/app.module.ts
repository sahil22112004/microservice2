import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { config } from "dotenv";
import { UserOutbox } from "./enitites/userOutbox.entity";

config();

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
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
