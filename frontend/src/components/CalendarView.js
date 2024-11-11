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
      setEvents(result.data);  // Set events from the response
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

  // Handle marking an event as done
  const handleDoneToggle = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/events/${id}/done`, { done: true });
      console.log('Event updated:', response.data);
      fetchEvents(selectedDate);  // Refetch events to show updated status
    } catch (error) {
      console.error('Error updating event done status:', error);
    }
  };

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div style={styles.container}>
      <div style={styles.flexContainer}>
        <div style={styles.calendarContainer}>
          <Calendar
            onClickDay={onDateClick}
            value={selectedDate}
            style={styles.calendar}
          />
        </div>

        <div style={styles.eventsContainer}>
          <h2 style={styles.heading}>Events for {selectedDate.toDateString()}</h2>

          {events.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Done</th>
                  <th style={styles.tableHeader}>Title</th>
                  <th style={styles.tableHeader}>Description</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Time</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} style={styles.tableRow}>
                    <td style={styles.tableData}>
                      <input
                        type="checkbox"
                        checked={event.done || false}
                        onChange={() => handleDoneToggle(event.id)}
                      />
                    </td>
                    <td
                      style={{
                        ...styles.tableData,
                        textDecoration: event.done ? 'line-through' : 'none',
                        color: event.done ? '#aaa' : '#000',
                      }}
                    >
                      {event.title}
                    </td>
                    <td style={styles.tableData}>{event.description}</td>
                    <td style={styles.tableData}>{event.date}</td>
                    <td style={styles.tableData}>{event.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling object for clean structure
const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
  },
  calendarContainer: {
    width: '28%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  calendar: {
    borderRadius: '8px',
  },
  eventsContainer: {
    width: '60%',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    fontSize: '1.1rem',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableData: {
    padding: '10px',
    fontSize: '1rem',
  },
};

export default CalendarAndEventList;
