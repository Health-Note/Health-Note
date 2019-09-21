/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [name, setText] = useState('');

  const handleChange = evt => {
    setText(evt.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <button>제출</button>
      </form>
    </div>
  );
};

export default Form;
