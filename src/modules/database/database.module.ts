import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './configDatabase';

@Module({
  imports: [MongooseModule.forRoot(databaseConfig)],
})
export class DatabaseModule {}
