import { Controller, Get, Post, Body, Param, Query, ConsoleLogger, Delete } from '@nestjs/common';
import { Book } from './book.entity';
import { promises } from 'dns';
import { BookService } from './book.services';
import { throwError } from 'rxjs';
import { query } from 'express';

@Controller('books')
export class BookController{
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getAllBooks():Promise<Book[]>{
        try{
            return this.bookService.getAllBooks();
        }
        catch(error){
            throwError;
        }
    }

    @Post()
    async create(@Body() Book:Book): Promise<Book>{
        try{
            return await this.bookService.createBook(Book);
        }
        catch(error){
            throw error;
        }
    }

    @Delete()
    async del(@Body() requestBody: { id: number }): Promise<void> {
        try {
            const id = requestBody.id;
            console.log(id);
            return await this.bookService.deleteBookById(id);
        } catch (error) {
            throw error;
        }
    }

    @Get('sorted')
    async sorted():Promise<Book[]>{
        try{
            return this.bookService.getSortedList();
        }
        catch(error){
            throwError;
        }
    }
    @Post('search')
    async search(@Body() query: { criteria: string }): Promise<Book[]> {
        try {
            return this.bookService.searchByTagsAndName(query.criteria);
        } catch (error) {
            throw error;
        }
    }

}