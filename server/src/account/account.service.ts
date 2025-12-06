import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { username, password, email, expansion } = createAccountDto;

    const existing = await this.accountRepository.findOne({ 
      where: { username: username } 
    });
    
    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const userUpper = username.toUpperCase();
    const passUpper = password.toUpperCase();
    const hash = crypto.createHash('sha1').update(`${userUpper}:${passUpper}`).digest('hex').toUpperCase();

    const account = this.accountRepository.create({
      username: userUpper,
      sha_pass_hash: hash,
      email,
      expansion: expansion || 0,
    });

    return this.accountRepository.save(account);
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
