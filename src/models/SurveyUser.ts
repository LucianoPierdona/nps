import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Survey } from './Survey';
import { User } from './User';

@Entity('surveys_users')
class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne((_type) => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne((_type) => Survey)
  @JoinColumn({ name: 'surveyId', referencedColumnName: 'id' })
  survey: Survey;

  @Column({ type: 'uuid' })
  surveyId: string;

  @Column({ type: 'text' })
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
