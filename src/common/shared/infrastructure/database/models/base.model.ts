import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  protected beforeInsertActions() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  protected beforeUpdateActions() {
    this.updatedAt = new Date();
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }

  toJSON(): object {
    const { id, createdAt, updatedAt, version, isActive, ...rest } = this;
    return {
      id,
      createdAt,
      updatedAt,
      isActive,
      ...rest
    };
  }
}
