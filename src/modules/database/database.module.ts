import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configDatabase } from './configDatabase';

@Module({
  imports: [MongooseModule.forRoot(configDatabase)],
})
export class DatabaseModule {}
