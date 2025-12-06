import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 32, unique: true })
  username: string;

  @Column({ name: 'sha_pass_hash', length: 40 })
  sha_pass_hash: string;

  @Column({ length: 255, default: '' })
  email: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  expansion: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joindate: Date;
}
