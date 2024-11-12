import { Controller, Get, Post, Body, Query, Patch, Param, Put, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()  // POST route to create an event
  async createEvent(@Body() eventData: { title: string; description: string; date: string; time: string }): Promise<Event> {
    return this.eventService.create(eventData); // Call service to create the event
  }

  @Get()  // GET route to fetch events by date
  async findByDate(@Query('date') date: string): Promise<Event[]> {
    return this.eventService.findByDate(date);  // Fetch events by date
  }

  @Patch(':id/done')
updateDoneStatus(@Param('id') id: string, @Body() body: { done: boolean }) {
  console.log(`Update request received for ID: ${id}, Done status: ${body.done}`);
  return this.eventService.updateDoneStatus(Number(id), body.done);
  }
  

  @Put(':id')  // PUT route to edit an event
  async updateEvent(
    @Param('id') id: string,
    @Body() updatedEvent: { title: string; description: string; date: string; time: string }
  ): Promise<Event> {
    return this.eventService.updateEvent(Number(id), updatedEvent);
  }

  @Delete(':id')  // DELETE route to delete an event
  async deleteEvent(@Param('id') id: string): Promise<void> {
    this.eventService.deleteEvent(Number(id));
  }

}

