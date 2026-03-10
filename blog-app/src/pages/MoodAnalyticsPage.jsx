import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';

const MoodAnalyticsPage = () => {
  const token = localStorage.getItem('token');
  const fullName = localStorage.getItem('fullName') || 'User';

  const [filter, setFilter] = useState('Month'); // Week, Month, Year
  const [moodData, setMoodData] = useState([]);
  const [entriesPerMonth, setEntriesPerMonth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://65.2.128.22:5000/entries/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMoodData(res.data.moodDistribution || []);
        setEntriesPerMonth(res.data.entriesPerMonth || []);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  const getMoodColor = (moodName) => {
    const colorMap = {
      Happy: '#6366f1',
      Neutral: '#9ca3af',
      Sad: '#f87171',
    };
    return colorMap[moodName] || '#6b7280';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">Loading analytics...</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <NavBar />

      <div className="max-w-7xl mx-auto p-6 pt-16">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Mood Analytics</h1>
        <p className="text-gray-700 mb-8">Hello, <span className="font-medium">{fullName}</span>. Review your mood trends and entry summaries.</p>

        {/* Filter Buttons */}
        <div className="mb-8 flex space-x-2">
          {['Week', 'Month', 'Year'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-150
                ${filter === f ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* Mood Distribution */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Distribution</h3>
            <div className="flex items-center justify-center w-full h-64 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
              {/* Simple circle as placeholder */}
              <div className="w-40 h-40 rounded-full bg-indigo-600 shadow-xl" style={{ border: '4px solid #fff' }}></div>
            </div>
          </div>

          {/* Entries Per Period */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Entries Per {filter}</h3>
            <div className="w-full h-64 p-4 flex items-end justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
              {entriesPerMonth.length > 0 ? (
                entriesPerMonth.map((entry, idx) => (
                  <div key={idx} className="mx-2 flex flex-col items-center">
                    <div className="bg-indigo-600 rounded-t-md" style={{ height: `${(entry.entries / Math.max(...entriesPerMonth.map(e => e.entries))) * 100}%`, width: '24px' }}></div>
                    <span className="text-xs text-gray-500 mt-1">{entry.month}</span>
                  </div>
                ))
              ) : <span className="text-gray-400">No entries yet</span>}
            </div>
          </div>

        </div>

        {/* Mood Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {moodData.filter(m => m.value > 0).map((mood, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getMoodColor(mood.name) }}></span>
                  <span className="text-lg font-medium text-gray-700">{mood.name}</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">{mood.value}</span>
                <span className="text-sm text-gray-500">
                  {((mood.value / Math.max(1, entriesPerMonth.reduce((sum, e) => sum + e.entries, 0))) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoodAnalyticsPage;