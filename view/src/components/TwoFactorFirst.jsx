import '../styles/TwoFactorFirst.css';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  types: [
    {
      type: 'error',
      background: 'indianred',
      duration: 4000,
      dismissible: true,
      position: { x: 'right', y: 'top' },
    },
  ],
});

export default function TwoFactorFirst() {
  const statusEl = useRef();
  const barcode = useState();
  const navigate = useNavigate();

  async function getBarcode() {
    try {
      const {
        data: { barcode },
        status,
      } = await axios.post('/auth/secret', {
        email,
      });

      console.log(barcode, status);

      if (status === 200) {
        navigate('/chat', {
          state: {
            username: response.data.username,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          },
          replace: true,
        });
      } else {
        notyf.error(response);
      }
    } catch (error) {
      console.log(error);
      notyf.error('User already exist');
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input ref={emailEl} type="text" placeholder="email" />
      <input ref={passwordEl} type="password" placeholder="password" />
      <button onClick={getBarcode}>getBarcode</button>
      Dont have a user?
      <Link to="/register">
        <button>register here!</button>
      </Link>
      <div ref={statusEl}></div>
    </div>
  );
}
