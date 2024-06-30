import React, { useEffect, useState } from 'react';
import './Welcome.css';

function Welcome() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formatDate = (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const today = new Date();
    setCurrentDate(formatDate(today));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <p className="headerText">Made by Kerem & Vibbodh 10d</p>
        <p className="headerText">{currentDate}</p>
      </div>
      <h2 className="title">Welcome to the NMS Cafeteria System!</h2>
      <p>Please wait 5 seconds to get started</p>
    </div>
  );
}

export default Welcome;
