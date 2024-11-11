import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { Event } from './event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',  // You can change this to your preferred database
      entities: [Event],
      synchronize: true,  // Automatically syncs the database schema, useful for development
    }),
    TypeOrmModule.forFeature([Event]), // Add the Event entity here
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class AppModule {}
