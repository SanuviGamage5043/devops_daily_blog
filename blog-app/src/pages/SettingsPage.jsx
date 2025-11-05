import React, { useState } from 'react';

const SettingsPage = () => {
  // Mock User Data
  const mockUser = {
    name: 'passenger',
    email: 'passenger@demo.com',
    remindersEnabled: true,
    reminderTime: '19:00', // 7:00 PM
  };

  const [settings, setSettings] = useState({
    name: mockUser.name,
    email: mockUser.email,
    remindersEnabled: mockUser.remindersEnabled,
    reminderTime: mockUser.reminderTime,
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      alert("Error: New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    console.log("Saving settings:", settings);

    // --- Mocking Save Process ---
    setTimeout(() => {
      setLoading(false);
      alert('Settings updated successfully!');
      // In a real app: API call to update user settings, then clear password fields
      setSettings(prev => ({ 
          ...prev, 
          newPassword: '', 
          confirmPassword: '' 
      }));
    }, 1500);
  };
  
  // Mock button action for the Export section (referencing the previous Export component)
  const handleMockExport = (format) => {
      alert(`Initiating quick export as ${format}...`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Global Header (Simplified) --- */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-medium text-indigo-600">My Journal</div>
          <div className="text-sm text-gray-600">
            Welcome, **passenger** | <button className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">Logout</button>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto p-6 pt-10">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Settings
        </h1>

        <form onSubmit={handleSaveSettings} className="space-y-10">
          
          {/* --- 1. Reminders Section --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Reminders</h2>
            <p className="text-gray-500 mb-5">Manage your journal reminders.</p>

            <div className="space-y-4">
                {/* Reminder Toggle */}
                <div className="flex justify-between items-center">
                    <label htmlFor="remindersEnabled" className="text-gray-700">
                        Enable daily reminders
                    </label>
                    {/* Tailwind Toggle Switch */}
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            name="remindersEnabled"
                            id="remindersEnabled"
                            checked={settings.remindersEnabled}
                            onChange={handleChange}
                            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${settings.remindersEnabled ? 'right-0 bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}
                            style={{ transition: 'right 0.2s' }}
                        />
                        <label htmlFor="remindersEnabled" className={`toggle-label block overflow-hidden h-6 rounded-full ${settings.remindersEnabled ? 'bg-indigo-600' : 'bg-gray-300'} cursor-pointer`}></label>
                    </div>
                </div>
                
                {/* Reminder Time Input (Conditional) */}
                {settings.remindersEnabled && (
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-1">
                            Remind me at:
                        </label>
                        <input
                            type="time"
                            name="reminderTime"
                            id="reminderTime"
                            value={settings.reminderTime}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                )}
            </div>
          </div>

          {/* --- 2. Export Data Section (as seen in screenshot) --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Export Data</h2>
            <p className="text-gray-500 mb-5">Download your journal entries.</p>
            
            <div className="flex flex-col space-y-3">
                <button 
                    type="button"
                    onClick={() => handleMockExport('JSON')}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-150 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-1a2 2 0 012-2h10a2 2 0 012 2v1a2 2 0 01-2 2z"></path></svg>
                    Export as JSON
                </button>
                <button 
                    type="button"
                    onClick={() => handleMockExport('CSV')}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-150 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Export as CSV
                </button>
            </div>
          </div>

          {/* --- 3. Account Information Section --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Account Information</h2>
            <p className="text-gray-500 mb-5">Update your account details and password.</p>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={settings.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={settings.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
              </div>

            </div>
          </div>

          {/* --- Final Save Button --- */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-6 py-2 text-lg font-medium rounded-lg shadow-md transition duration-150 flex items-center
                ${loading
                  ? 'bg-indigo-400 text-white cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-4-6l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Tailwind CSS for the custom toggle switch */}
      <style jsx global>{`
        .toggle-checkbox:checked {
            right: 0;
            border-color: #4f46e5; /* indigo-600 */
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #4f46e5; /* indigo-600 */
        }
        .toggle-checkbox {
            left: 0;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;