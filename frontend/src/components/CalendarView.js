// CalendarAndEventList.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios';

const CalendarAndEventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch events from backend for the selected date
  const fetchEvents = async (date) => {
    const formattedDate = formatDateForBackend(date);  // Convert to YYYY-MM-DD format
    try {
      const result = await axios.get(`http://localhost:3001/api/events?date=${formattedDate}`);
      setEvents(result.data);
    } catch (error) {
      console.error('Error fetching events:', error);  // Log error for debugging
    }
  };
    
    // Format the date as YYYY-MM-DD for backend
const formatDateForBackend = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;  // YYYY-MM-DD format
  };
  
  

  // Handle date click from the calendar
  const onDateClick = (date) => {
    setSelectedDate(date);
    fetchEvents(date);
  };

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%' }}>
          <Calendar onClickDay={onDateClick} value={selectedDate} />
        </div>
        
        <div style={{ width: '55%' }}>
          <h2>Events for {selectedDate.toDateString()}</h2>
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id}>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>{event.date} at {event.time}</p>
                </li>
              ))
            ) : (
              <p>No events found for this date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarAndEventList;
