import React, { useState } from 'react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [closeFriends, setCloseFriends] = useState(["Riya", "Alex"]); // demo data

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const togglePrivacy = () => setIsPrivate(!isPrivate);
  const toggleNotifications = () => setNotifications(!notifications);

  const handleLogout = () => {
    // handle logout logic
    alert("Logging out...");
  };

  const handleDeactivate = () => {
    // confirmation and API call
    alert("Account deactivation initiated.");
  };

  return (
    <div className="ml-[260px] px-4 sm:px-6 py-6 w-[calc(100%-260px)] bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      {/* Appearance */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Appearance</h2>
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Privacy</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={togglePrivacy}
          />
          <span>{isPrivate ? "Private Account" : "Public Account"}</span>
        </label>
      </div>

      {/* Edit Profile */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
      </div>

      {/* Close Friends */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Close Friends</h2>
        <ul className="list-disc pl-5">
          {closeFriends.map((friend, idx) => (
            <li key={idx}>{friend}</li>
          ))}
        </ul>
        <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded">
          Manage List
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
          />
          <span>{notifications ? "Enabled" : "Disabled"}</span>
        </label>
      </div>

      {/* Logout & Deactivate */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Account</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mr-4"
        >
          Logout
        </button>
        <button
          onClick={handleDeactivate}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
