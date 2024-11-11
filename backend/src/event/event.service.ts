// src/event/event.service.ts
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
    const formattedDate = new Date(eventData.date).toISOString().split('T')[0];  // Format date as YYYY-MM-DD
    const formattedTime = new Date(`1970-01-01T${eventData.time}Z`).toISOString().split('T')[1].slice(0, 5);  // Format time as HH:mm

    const newEvent: Event = {
      id: Date.now(),  // Create a unique ID for the event
      title: eventData.title,
      description: eventData.description,
      date: formattedDate,  // Store the date in YYYY-MM-DD format
      time: formattedTime,  // Store the time in HH:mm format
      done: false,  // Default "done" value is false
    };

    this.events.push(newEvent);  // Store the event in the in-memory array
    return newEvent;
  }

  // Fetch events by date
  findByDate(date: string): Event[] {
    if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
      throw new Error('Invalid date format');
    }
    return this.events.filter(event => event.date === date);
  }

  // Update "done" status of an event
  updateDoneStatus(id: number, done: boolean): Event {
    console.log(`Received ID: ${id}, Done status: ${done}`);
    const event = this.events.find(event => event.id === id);
    
    if (!event) {
      console.log(`Event with ID ${id} not found`);
      throw new Error('Event not found');
    }
    
    event.done = done;
    console.log(`Event updated: ${JSON.stringify(event)}`);
    return event;
  }
  

}
