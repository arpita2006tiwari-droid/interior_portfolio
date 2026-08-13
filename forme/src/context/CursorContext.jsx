import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState('DEFAULT'); // 'DEFAULT', 'VIEW', 'EXPLORE', 'DRAG'

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
};
