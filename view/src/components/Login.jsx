import '../styles/login.css';
import React, { useRef } from 'react';
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

export default function Login() {
  const statusEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const navigate = useNavigate();

  async function login() {
    try {
      const email = emailEl.current.value;
      const password = passwordEl.current.value;
      const response = await axios.post('/user/login', {
        email,
        password,
      });

      statusEl.current.value = response.data;
      console.log(response);

      if (response.status === 200) {
        navigate('/chat', {
          state: { username: response.data.username },
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
      <button
        onClick={() => {
          login();
        }}
      >
        login
      </button>
      Dont have a user?
      <Link to="/register">
        <button>register here!</button>
      </Link>
      <div ref={statusEl}></div>
    </div>
  );
}
