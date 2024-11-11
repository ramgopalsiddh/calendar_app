import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  private events: Event[] = [];  // In-memory array to store events

  // Fetch all events
  findAll(): Event[] {
    return this.events;
  }

  // Create a new event
  create(eventData: { title: string; description: string; date: string; time: string }): Event {
    // Format date and time before saving
    const formattedDate = new Date(eventData.date).toISOString().split('T')[0];  // Format date as YYYY-MM-DD
    const formattedTime = new Date(`1970-01-01T${eventData.time}Z`).toISOString().split('T')[1].slice(0, 5);  // Format time as HH:mm

    const newEvent: Event = {
      id: Date.now(),  // Create a unique ID for the event
      title: eventData.title,
      description: eventData.description,
      date: formattedDate,  // Store the date in YYYY-MM-DD format
      time: formattedTime,  // Store the time in HH:mm format
    };
    
    this.events.push(newEvent);  // Store the event in the in-memory array
    return newEvent;
  }

  // Fetch events by date (ignores time part when filtering)
  // EventService: Ensure that the date format is being handled correctly
findByDate(date: string): Event[] {
    // Validate date format if necessary
    if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
      throw new Error('Invalid date format');
    }
    return this.events.filter(event => event.date === date);
  }
  
}
