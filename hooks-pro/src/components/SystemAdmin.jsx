import React from 'react';
import './SystemAdmin.css';

const SystemAdmin = ({ users, onDelete, onUpdate }) => {
  const handleDelete = (email) => {
    onDelete(email);
  };

  const handleUpdate = (email) => {
    onUpdate(email);
  };

  return (
    <div className="SystemAdmin-container">
      <h2 className="SystemAdmin-title">System Admin Panel</h2>
      <table className="SystemAdmin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Profile Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="SystemAdmin-row">
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td><img src={user.profileImage} alt="Profile" className="SystemAdmin-profileImage" /></td>
              <td>
                <button onClick={() => handleDelete(user.email)} className="SystemAdmin-deleteButton">Delete</button>
                <button onClick={() => handleUpdate(user.email)} className="SystemAdmin-updateButton">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemAdmin;
