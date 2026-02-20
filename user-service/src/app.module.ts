import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { config } from 'dotenv'
import { UserOutbox } from './enitites/userOutbox.entity'
import { User } from './enitites/user.entity'
import { RabbitMQConnection } from './rabbitmq/rabbitmq.connection'
import { RabbitMQPublisher } from './rabbitmq/producer/rabbitmq.publisher'

config()

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
      entities: [User,UserOutbox],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User,UserOutbox]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
