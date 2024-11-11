import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()  // POST route to create an event
  async createEvent(@Body() eventData: { title: string; description: string; date: string; time: string }): Promise<Event> {
    return this.eventService.create(eventData); // Call service to create the event
  }

  @Get()
  async findByDate(@Query('date') date: string): Promise<Event[]> {
    return this.eventService.findByDate(date);  // Fetch events by date
  }
}
