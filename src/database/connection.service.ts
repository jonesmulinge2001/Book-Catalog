/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { createDatabasePool } from 'src/config/database.config';
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    this.pool = createDatabasePool();
    await this.testConnection();
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  private async testConnection(): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Failed to connect to database', error);
      throw error;
    }
  }

  async query(text:string, params?: any[]): Promise<any>{
    const client = await this.pool.query(text,params);
    try{
      const result = await client.query(text,params);
      return result;
    }
    finally{
      client.release();
    }
  }

  // getClient
  async getClient(): Promise<PoolClient>{
    return this.pool.connect();
  }

}
