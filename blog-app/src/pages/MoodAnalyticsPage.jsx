import { useState } from 'react';
// import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// You would need to install recharts: npm install recharts

// Mock Data for the Charts
const mockMoodDistribution = [
  { name: 'Happy', value: 1, color: '#6366f1' }, // Indigo-500
  { name: 'Neutral', value: 0, color: '#9ca3af' }, // Gray-400
  { name: 'Sad', value: 0, color: '#f87171' }, // Red-400
  // ... more moods
];

const mockEntriesPerMonth = [
  { month: 'Nov 2025', entries: 1 },
];

const MoodAnalyticsPage = () => {
  const [filter, setFilter] = useState('Month'); // Week, Month, Year

  // Helper function to render a chart placeholder
  const ChartPlaceholder = ({ title, width = '100%', height = 250, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div style={{ width, height }}>
        {/* Placeholder text for the chart area */}
        <div className="flex items-center justify-center w-full h-full bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
  
  // Helper function to get color for mood summary
  const getMoodColor = (moodName) => {
    return mockMoodDistribution.find(m => m.name === moodName)?.color || '#6b7280';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Global Header (Simplified) --- */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-medium text-indigo-600">My Journal</div>
          <div className="text-sm text-gray-600">
            Welcome, passenger | <button className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">Logout</button>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto p-6 pt-10">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Mood Analytics
        </h1>

        {/* --- Filter Buttons --- */}
        <div className="mb-8 flex space-x-2">
          {['Week', 'Month', 'Year'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition duration-150
                ${filter === f
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {/* --- Charts Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* 1. Mood Distribution (Pie Chart) */}
          <div className="lg:col-span-1">
            <ChartPlaceholder title="Mood Distribution">
                {/* Recharts Pie Chart goes here */}
                {/* The single color circle in your screenshot */}
                <div className="w-40 h-40 rounded-full bg-indigo-600 shadow-xl" style={{ border: '4px solid #fff' }}></div>
            </ChartPlaceholder>
          </div>

          {/* 2. Entries Per Time Period (Bar Chart) */}
          <div className="lg:col-span-2">
            <ChartPlaceholder title={`Entries Per ${filter}`}>
                {/* Recharts Bar Chart goes here */}
                {/* Bar chart based on your screenshot */}
                <div className="w-full h-full p-4">
                  <div className="flex items-end h-full relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>0.75</span>
                        <span>0.50</span>
                        <span>0.25</span>
                        <span>0</span>
                    </div>
                    {/* The bar */}
                    <div className="flex-grow flex justify-center ml-8">
                        <div 
                          className="w-1/4 bg-indigo-600 rounded-t-sm" 
                          style={{ height: '90%' }} // Represents ~1 entry on the scale
                        ></div>
                    </div>
                  </div>
                  {/* X-axis label */}
                  <div className="text-center text-xs text-gray-500 pt-1">
                    Nov 2025
                  </div>
                </div>
            </ChartPlaceholder>
          </div>
        </div>

        {/* --- Mood Summary --- */}
        <div className="grid grid-cols-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Summary</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {mockMoodDistribution
                .filter(mood => mood.value > 0) // Only show moods with entries
                .map((mood, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <span 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: getMoodColor(mood.name) }}
                    ></span>
                    <span className="text-lg font-medium text-gray-700">{mood.name}</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{mood.value}</span>
                  <span className="text-sm text-gray-500">
                    {((mood.value / mockEntriesPerMonth.reduce((sum, item) => sum + item.entries, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoodAnalyticsPage;