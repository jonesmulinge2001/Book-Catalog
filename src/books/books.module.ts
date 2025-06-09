import { Module } from '@nestjs/common';
import { BooksService } from '../books/books.service';

@Module({
  providers: [BooksService],
})
export class BooksModule {}
