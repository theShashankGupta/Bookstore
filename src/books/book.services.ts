import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class  BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async createBook(Book: Book):Promise<Book>{
        return await this.bookRepository.save(Book);
    }
    async getAllBooks(): Promise<Book[]> {
        return await this.bookRepository.find();
    }
    async deleteBookById(id: number): Promise<void> {
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Book with ID ${id} not found`);
        }
      }
    async getSortedList() : Promise<Book[]>{
        return await this.bookRepository.createQueryBuilder('book')
        .orderBy('book.rating', 'DESC')
        .getMany();
    }  
    
    async searchByTagsAndName(query:string): Promise<Book[]>{
        return this.bookRepository.createQueryBuilder('book')
        .where('book.name LIKE :query OR book.tags LIKE :query', { query: `%${query}%` })
        .getMany();
    }  


    // async getBookById(id: any): Promise<Book> {
    //     return this.bookRepository.findOne(id);
    // }
}

