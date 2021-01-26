import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from '../commom/helpers/crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;
}
