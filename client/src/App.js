import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
//import {  Redirect } from 'react-router';
import Login from './Pages/Login';
import './App.css';
import Navbar from './Components/NavBar';
import MainPage from './Pages/MainPage';
import Register from './Pages/Register';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/login', {
        email,
        password
      });

      console.log('response from login: ', response);
      sessionStorage.setItem('token', response.data);

      if (sessionStorage.getItem('token')) {
        setIsLoggedIn(true);
        history.push('/');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getUser();
    console.log('isLoggedIn: ', isLoggedIn);
  });

  const getUser = async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (isLoggedIn) {
      const responseData = await response.data;
      console.log('userData: ', responseData);
      setUserName(responseData.username);
      setUserId(responseData.id);
    } else {
    }
  };

  return (
    <div className='App'>
      <Router>
        <Navbar
          userName={userName}
          setUserName={setUserName}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main className='form-signin'>
          <Route
            path='/'
            exact
            render={() =>
              isLoggedIn ? (
                <MainPage
                  userId={userId}
                  userName={userName}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                <Register />
              )
            }
          />

          <Route
            path='/login'
            render={() =>
              isLoggedIn ? (
                <Redirect to='/' />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              )
            }
          />

          <Route
            path='/register'
            render={isLoggedIn ? <Redirect to='/' /> : <Register />}
          />
        </main>
      </Router>
    </div>
  );
}

export default App;
