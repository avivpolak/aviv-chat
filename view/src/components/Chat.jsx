import '../styles/chat.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Message from './Message';
import User from './User';

const notyf = new Notyf({
  types: [
    {
      type: 'success',
      duration: 3000,
      dismissible: true,
      position: { x: 'right', y: 'bottom' },
    },
  ],
});

export default function Chat() {
  const chatEl = useRef();
  const inputEl = useRef();
  const twoStepEl = useRef();
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const source = new EventSource(
      `http://localhost:8080/chat?username=${state.username}`
    );

    source.onopen = (event) => {
      notyf.success('Welcome to the chat');
      console.log('Welcome to the chat');
      console.log(state.accessToken);
    };

    source.onmessage = function logEvents(event) {
      const { MESSAGES, usersList } = JSON.parse(event.data);

      if (usersList) {
        setUsers(usersList);
      }

      if (MESSAGES) {
        setMessages(MESSAGES);
      }
    };
  }, []);

  async function toggleTwoStep() {
    try {
      console.log('toggleing');
      await axios.patch('/toggleTwoStep', {
        user: state.username,
        twoStep: twoStepEl.current.value,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function sendMsg() {
    console.log(state.username);
    try {
      let acceess = await axios.post('/user/token', {
        token: state.refreshToken,
      });
      console.log(acceess.data.accessToken);
      await axios.post('/chat', {
        user: state.username,
        message: inputEl.current.value,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      <div className="left">
        <div ref={chatEl} className="chat">
          {messages.map((msg) => (
            <Message message={msg} />
          ))}
        </div>
        <div className="input">
          <input
            ref={inputEl}
            type="text"
            placeholder="write your message here"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                sendMsg();
                inputEl.current.value = '';
              }
            }}
          />
          <button
            className="send-button"
            onClick={() => {
              sendMsg();
            }}
          >
            send
          </button>
        </div>
      </div>
      <div className="connected">
        {users.length} users in the chat
        <br />
        <br />
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
      <input
        ref={twoStepEl}
        type={'checkbox'}
        onChange={() => {
          toggleTwoStep();
        }}
      />
    </div>
  );
}
