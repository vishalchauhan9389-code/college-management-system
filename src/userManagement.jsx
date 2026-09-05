import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>👥 User Management</h1>
          <p>Manage system users and their roles</p>
        </div>
      </div>

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>System Users</h2>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="user-table">
            <div className="user-row user-heading">
              <span>Username</span>
              <span>Role</span>
              <span>User ID</span>
            </div>

            {filteredUsers.map((user) => (
              <div className="user-row" key={user._id}>
                <span>{user.username}</span>
                <span>
                  <strong>{user.role}</strong>
                </span>
                <span>{user._id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;