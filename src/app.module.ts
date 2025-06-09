import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { DatabaseService } from './database/connection.service';

@Module({
  imports: [BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
