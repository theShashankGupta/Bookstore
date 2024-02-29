import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  author: string;

  @Column({ type: 'simple-array', nullable: false })
  tags: string[];

  @Column({ default: 0 })
  totalRating: number;

  @Column({ default: 0 })
  ratingCount: number;

  @Column({ default: 0 })
  rating: number;

  @BeforeInsert()
  @BeforeUpdate()
  updateRating() {
    this.rating = this.averageRating();
  }

  private averageRating(): number {
    return this.ratingCount > 0 ? this.totalRating / this.ratingCount : 0.0;
  }
}
