import '../styles/login.css';
import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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

export default function Register() {
  const statusEl = useRef();
  const usernameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const bioEl = useRef();
  const birthDateEl = useRef();
  const navigate = useNavigate();

  async function register() {
    try {
      const username = usernameEl.current.value;
      const email = emailEl.current.value;
      const password = passwordEl.current.value;
      const bio = bioEl.current.value;
      const birthDate = birthDateEl.current.value;
      const response = await axios.post('/user/register', {
        username,
        email,
        password,
        bio,
        birthDate,
      });

      statusEl.current.value = response.data;
      console.log(response);

      if (response.status === 201) {
        navigate('/');
      } else {
        notyf.error(response);
      }
    } catch (error) {
      console.log(error);
      notyf.error(error);
    }
  }

  return (
    <div className="login">
      <h1>Register</h1>
      <input ref={usernameEl} type="text" placeholder="username" />
      <input ref={emailEl} type="email" placeholder="email" />
      <input ref={passwordEl} type="password" placeholder="email" />
      <input
        ref={bioEl}
        type="text"
        placeholder="Tell us some about yourself..."
      />
      <input ref={birthDateEl} type="date" placeholder="birth date" />
      <button
        onClick={() => {
          register();
        }}
      >
        register
      </button>
      Already have a user?
      <Link to="/">
        <button>Back to log in</button>
      </Link>
      <div ref={statusEl}></div>
    </div>
  );
}
