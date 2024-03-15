import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import SystemAdmin from './components/SystemAdmin';
import EditDetails from './components/EditDetails';
import './App.css';
const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  };

  const registerUser = (user) => {
    const updatedUsers = [...users, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const loginUser = (username, password) => {
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
    } else {
      
      if (username === 'admin' && password === 'ad12343211ad') {
        const adminUser = { username: 'admin', password: 'ad12343211ad' }; 
        setCurrentUser(adminUser);
        setIsAdmin(true); 
      } else {
        alert('Please login to view your profile.');
      }
    }
  };

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    alert('You have been logged out.');
  };
  

  const editUser = (updatedUser) => {
    const updatedUsers = users.map((user) => (user.email === updatedUser.email ? updatedUser : user));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  return (
    <div>
      <h1>User Management System</h1>
      <div className="app-container">
      <div className="login-register-container">
      <Register onRegister={registerUser} />
     
      <Login onLogin={loginUser} />
      </div>
      </div>
      {currentUser ? (
        <>
          <div>
          {!isAdmin && <Profile user={currentUser} />}
            <EditDetails user={currentUser} onEdit={editUser} />
          </div>
          {isAdmin && (
            <SystemAdmin users={users} onDelete={deleteUser} />
          )}
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <div>Please login to view your profile</div>
      )}
    </div>
  );
};

export default App;
