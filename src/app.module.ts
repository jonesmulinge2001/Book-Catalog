import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlService } from './books/sql/sql.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, SqlService, DatabaseService],
})
export class AppModule {}
