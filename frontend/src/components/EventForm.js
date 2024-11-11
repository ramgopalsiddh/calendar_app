// EventForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ fetchEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the event data in a format the backend expects
      await axios.post('http://localhost:3001/api/events', { title, description, date, time });
      fetchEvents();  // Refresh the event list
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
