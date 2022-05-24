import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NODE_ENV !== 'TEST'
        ? process.env.DATABASE_URL
        : process.env.DATABASE_TEST_URL,
    ),
  ],
})
export class DatabaseModule {}
