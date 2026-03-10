import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';

const SettingsPage = () => {
  const token = localStorage.getItem('token');
  const fullName = localStorage.getItem('userName') || 'User';

  const [settings, setSettings] = useState({
    name: fullName,
    email: '',
    remindersEnabled: true,
    reminderTime: '19:00',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch user settings from backend on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://65.2.128.22:5000/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSettings(prev => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
          remindersEnabled: res.data.remindersEnabled,
          reminderTime: res.data.reminderTime || '19:00'
        }));
      } catch (err) {
        console.error(err);
        alert('Failed to fetch user settings');
      }
    };
    fetchSettings();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      alert('❌ New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.put('http://65.2.128.22:5000/users/me', {
        name: settings.name,
        email: settings.email,
        remindersEnabled: settings.remindersEnabled,
        reminderTime: settings.remindersEnabled ? settings.reminderTime : null,
        password: settings.newPassword || undefined
      }, { headers: { Authorization: `Bearer ${token}` }});

      alert('✅ Settings updated successfully!');
      setSettings(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      localStorage.setItem('fullName', settings.name);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <NavBar />

      <div className="max-w-3xl mx-auto p-6 pt-16">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Settings</h1>
        <p className="text-gray-700 mb-8">Hello, <span className="font-medium">{fullName}</span>. Manage your account and reminder settings below.</p>

        <form onSubmit={handleSaveSettings} className="space-y-8">

          {/* Reminders */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Reminders</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Enable daily reminders</span>
              <input
                type="checkbox"
                name="remindersEnabled"
                checked={settings.remindersEnabled}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            {settings.remindersEnabled && (
              <div className="w-full sm:w-1/2">
                <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Remind me at:
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  value={settings.reminderTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
          </div>

          {/* Account Information */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-lg font-medium rounded-lg shadow-md transition duration-150
                ${loading ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
              `}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SettingsPage;