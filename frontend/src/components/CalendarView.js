import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarAndEventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editEventId, setEditEventId] = useState(null); // Track edited event ID
  const [editData, setEditData] = useState({ title: '', description: '', date: '', time: '' });

  // Fetch events
  const fetchEvents = async (date) => {
    const formattedDate = formatDateForBackend(date);
    try {
      const result = await axios.get(`http://localhost:3001/api/events?date=${formattedDate}`);
      setEvents(result.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Format date
  const formatDateForBackend = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Handle date click
  const onDateClick = (date) => {
    setSelectedDate(date);
    fetchEvents(date);
  };

  // Toggle "done" status
  const handleDoneToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/api/events/${id}/done`, { done: true });
      fetchEvents(selectedDate);
    } catch (error) {
      console.error('Error updating event done status:', error);
    }
  };

  // Open inline edit mode
  const openInlineEdit = (event) => {
    setEditEventId(event.id);
    setEditData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
    });
  };

  // Handle inline edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save the inline edited event
  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/events/${editEventId}`, editData);
      setEditEventId(null); // Exit edit mode
      fetchEvents(selectedDate);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Cancel inline edit
  const cancelEdit = () => {
    setEditEventId(null);
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/events/${id}`);
      fetchEvents(selectedDate);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Load events on date change
  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div style={styles.container}>
      <div style={styles.flexContainer}>
        <div style={styles.calendarContainer}>
          <Calendar onClickDay={onDateClick} value={selectedDate} style={styles.calendar} />
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
                  <th style={styles.tableHeader}>Actions</th>
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
                    {/* Conditionally render input fields for the row in edit mode */}
                    {editEventId === event.id ? (
                      <>
                        <td style={styles.tableData}>
                          <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td style={styles.tableData}>
                          <input
                            type="text"
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td style={styles.tableData}>
                          <input
                            type="date"
                            name="date"
                            value={editData.date}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td style={styles.tableData}>
                          <input
                            type="time"
                            name="time"
                            value={editData.time}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td style={styles.tableData}>
                          <button style={styles.saveButton} onClick={handleEditSave}>Save</button>
                          <button style={styles.cancelButton} onClick={cancelEdit}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ ...styles.tableData, textDecoration: event.done ? 'line-through' : 'none' }}>
                          {event.title}
                        </td>
                        <td style={styles.tableData}>{event.description}</td>
                        <td style={styles.tableData}>{event.date}</td>
                        <td style={styles.tableData}>{event.time}</td>
                        <td style={styles.tableData}>
                          <button style={styles.editButton} onClick={() => openInlineEdit(event)}>Edit</button>
                          <button style={styles.deleteButton} onClick={() => handleDelete(event.id)}>Delete</button>
                        </td>
                      </>
                    )}
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
    width: '68%',
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
  editButton: {
    backgroundColor: 'green',  
    color: 'white',
    border: 'none',
    padding: '5px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '2px',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '20px',
    margin: '5px',
  },
  saveButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: '5px',
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: '5px',
  },
  
};

export default CalendarAndEventList;
