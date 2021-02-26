import React from 'react';

export default function ModeSelector(props) {
  const { onSelect } = props;

  const handleSelect = (choice) => {
    onSelect(choice);
  };

  const smallData =
    'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  const bigData =
    'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '50px 0',
      }}
    >
      <button
        onClick={() => handleSelect(smallData)}
        className='btn btn-primary'
      >
        {' '}
        32 пользователя
      </button>
      <button onClick={() => handleSelect(bigData)} className='btn btn-warning'>
        {' '}
        1000 пользователей
      </button>
    </div>
  );
}
