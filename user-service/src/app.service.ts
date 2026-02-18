import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './enitites/user.entity';
import { UserOutbox } from './enitites/userOutbox.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserOutbox) private userOutboxRepo: Repository<UserOutbox>,
    private dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async CreateUser(createUserDto: CreateUserDto) {
    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, createUserDto);
      await manager.save(user);

      const userOutbox = manager.create(UserOutbox, {
        payload: createUserDto,
      });

      await manager.save(userOutbox);

      return { message: 'user created successfully' };
    });
  }
}
