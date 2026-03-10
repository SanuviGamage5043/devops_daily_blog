import { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';

const ExportPage = () => {
  const [exportFormat, setExportFormat] = useState('PDF'); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const fullName = localStorage.getItem('fullName') || 'User';

  const exportFormats = ['PDF', 'CSV', 'JSON'];

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Please select a valid date range.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `http://65.2.128.22:5000/entries/export?start=${startDate}&end=${endDate}&format=${exportFormat.toLowerCase()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // for downloading files
        }
      );

      // Create a blob and trigger download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `journal_entries_${startDate}_to_${endDate}.${exportFormat.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert(`✅ Your entries from ${startDate} to ${endDate} have been downloaded as ${exportFormat}.`);
    } catch (err) {
      console.error('Export failed:', err);
      alert('❌ Failed to export entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <NavBar />

      <div className="max-w-xl mx-auto bg-white mt-16 p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-serif font-bold text-indigo-700 mb-4 border-b pb-3">
          Export Journal Data
        </h1>
        <p className="text-gray-600 mb-6">
          Hello, <span className="font-medium text-gray-800">{fullName}</span>. Select a format and date range to download your entries.
        </p>

        <form onSubmit={handleDownload} className="space-y-6">

          {/* Format selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Select Export Format</label>
            <div className="flex space-x-4">
              {exportFormats.map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setExportFormat(format)}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg border transition duration-150
                    ${exportFormat === format
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm text-gray-500 mb-1">From</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm text-gray-500 mb-1">To</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Download Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-medium rounded-lg shadow-md transition duration-150 flex items-center justify-center
              ${loading ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Download...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download Entries
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ExportPage;