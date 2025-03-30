import React, { createContext, useState, useContext } from 'react';
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);

  const setCurrentEvent = (eventData) => {
    setEvent(eventData);
  };

  const clearEvent = () => {
    setEvent(null);
  };

  return (
    <EventContext.Provider value={{ event, setCurrentEvent, clearEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
