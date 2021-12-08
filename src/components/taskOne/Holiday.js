import React from 'react';
import './style.css';

const Holiday = ({holiday}) => {
  const {title, date, notes, bunting} = holiday
  return (
    <div className="holiday">
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>notes: {notes}</p>
      <p>bunting: {String(bunting)}</p>
    </div>
  );
};

export default Holiday;