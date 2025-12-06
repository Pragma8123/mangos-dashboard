import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 32, unique: true })
  username: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  gmlevel: number;

  @Column({ type: 'longtext', nullable: true })
  sessionkey: string;

  @Column({ type: 'longtext', nullable: true })
  v: string;

  @Column({ type: 'longtext', nullable: true })
  s: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  joindate: Date;

  @Column({ length: 30, default: '0.0.0.0' })
  lockedIp: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  failed_logins: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  locked: number;

  @Column({ type: 'char', length: 32, default: '' })
  last_module: string;

  @Column({ type: 'mediumint', unsigned: true, default: 0 })
  module_day: number;

  @Column({ name: 'active_realm_id', type: 'int', unsigned: true, default: 0 })
  active_realm_id: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  expansion: number;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  mutetime: string; // BigInt handled as string in JS usually

  @Column({ length: 4, default: '' })
  locale: string;

  @Column({ length: 4, default: '0' })
  os: string;

  @Column({ length: 4, default: '0' })
  platform: string;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  flags: number;
}
