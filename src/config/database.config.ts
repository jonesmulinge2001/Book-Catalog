/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Pool } from 'pg';


export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export const databaseConfig: DatabaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'shal00j1010',
    database: process.env.DB_NAME || 'bookcatalog',
    ssl: process.env.NODE_ENV === 'production',
}

// create database pool
export const createDatabasePool = () : Pool => {
    return new Pool({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port,
        ssl: databaseConfig.ssl? {rejectUnauthorized:false} : false,
        max:20,
        idleTimeoutMillis:3000,
        connectionTimeoutMillis:3000
    });
}