import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext,useState } from 'react';

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tutor,setTutor]= useState({});
  return (
    <Context.Provider  
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
        tutor,
        setTutor,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
