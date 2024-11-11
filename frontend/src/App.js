import React from 'react';
import CalendarView from './components/CalendarView';
import EventForm from './components/EventForm';

function App() {
  return (
    <div className="App">
      <h1>Calendar App</h1>
      <EventForm />
      <CalendarView />
    </div>
  );
}

export default App;
