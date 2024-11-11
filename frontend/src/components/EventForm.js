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
      
      // Refresh the event list after submitting the form
      fetchEvents();  // Re-fetch the events to include the newly added one

      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');

      // Refresh the page
      window.location.reload();  // This will reload the page, effectively refreshing it

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.inputDateTime}  // Use custom style for date
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={styles.inputTime}  // Use custom style for time (updated)
        />
        <button type="submit" style={styles.button}>Create Event</button>
      </div>
    </form>
  );
};

// Styling object for clean structure
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column', // Set to column to stack fields vertically
    gap: '20px',
    width: '95%',
    maxWidth: '100%',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    flexWrap: 'nowrap', // Ensure no wrapping occurs, keeping everything in one row
  },
  input: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '22%', // Ensure inputs fit properly in the row
  },
  inputDateTime: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '12%', // Smaller width for date input
  },
  inputTime: {
    padding: '3px', // Reduced padding to decrease height
    fontSize: '0.9rem', // Slightly smaller font size
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '6%', // Decreased width to make it half of the previous size
    height: '30px', // Reduced height
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '30%',  // Adjust width to fit in the row
    minHeight: '30px',
    resize: 'none',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default EventForm;
