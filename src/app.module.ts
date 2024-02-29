import { Module } from '@nestjs/common';
import { Book } from './books/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './books/book.module';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'; // Import the TypeOrmModuleOptions interface

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bookstoreDB',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }), 
    TypeOrmModule.forFeature([Book]),
    BookModule,
  ],
})
export class AppModule {}

