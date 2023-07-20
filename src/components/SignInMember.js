import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_MEMBER } from '../utils/actions';

export default function CreateNewMember() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [isPasswordSet, setIsPasswordSet] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handlePinChange = (event) => {
      const { value } = event.target;
      const formattedValue = value.replace(/\D/g, '').slice(0, 4); 
      // Remove non-digit characters and limit to 4 digits
      setPin(formattedValue);
    };
  
    const handleSetPassword = () => {
      if (name.trim() !== '' && pin.length === 4) {
        setIsPasswordSet(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Please enter a valid name and a 4-digit pin.');
      }
    };
  
    return (
      <div>
        {isPasswordSet ? (
          <p>Password has been set for {name}.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            <br />
            <input
              type="text"
              placeholder="Enter a 4-digit pin"
              value={pin}
              onChange={handlePinChange}
              maxLength={4}
            />
            <br />
            <button
              onClick={() =>
                dispatch({
                  type: ADD_MEMBER,
                  payload: {
                    name: name,
                    pin: pin,
                  },
                })
              }
            >
              Set Password
            </button>
 
            {errorMessage && <p>{errorMessage}</p>}
          </>
        )}
      </div>
    );
  };

