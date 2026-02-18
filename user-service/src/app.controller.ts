import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {CreateUserDto} from './dto/create-user.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  CreateUser(@Body() CreateUserDto: CreateUserDto) {
    return this.appService.CreateUser(CreateUserDto);
  }
}
