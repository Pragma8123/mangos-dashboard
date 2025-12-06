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

    // SRP6 Calculations
    const salt = crypto.randomBytes(32);
    
    // h1 = SHA1(USERNAME:PASSWORD)
    const h1 = crypto.createHash('sha1').update(`${userUpper}:${passUpper}`).digest();
    
    // h2 = SHA1(salt, h1)
    const h2 = crypto.createHash('sha1').update(salt).update(h1).digest();
    
    // Convert h2 to BigInt (Treating as Little Endian usually for WoW, but let's verify standard)
    // Actually, standard SRP6 uses Big Endian. CMaNGOS PHP scripts use `gmp_import($h2, 1, GMP_LSW_FIRST)` which is Little Endian?
    // Let's check a known good implementation.
    // TrinityCore uses Little Endian for the 'x' calculation (h2 -> integer).
    // Mangos also usually uses Little Endian.
    
    const x = BigInt('0x' + h2.reverse().toString('hex'));

    const N = BigInt('0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7');
    const g = BigInt(7);

    // v = g^x % N
    const v = this.modPow(g, x, N);

    const account = this.accountRepository.create({
      username: userUpper,
      s: salt.toString('hex').toUpperCase(),
      v: v.toString(16).toUpperCase(),
      email,
      expansion: expansion || 0,
      gmlevel: 0,
      locked: 0,
    });

    return this.accountRepository.save(account);
  }

  // Modular Exponentiation: (base^exp) % mod
  private modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let res = BigInt(1);
    base %= mod;
    while (exp > 0) {
      if (exp % BigInt(2) === BigInt(1)) res = (res * base) % mod;
      base = (base * base) % mod;
      exp /= BigInt(2);
    }
    return res;
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
