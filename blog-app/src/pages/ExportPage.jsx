import { useState } from 'react';

const ExportPage = () => {
  const [exportFormat, setExportFormat] = useState('PDF'); // Default to PDF
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const exportFormats = ['PDF', 'CSV', 'JSON']; // Added JSON as a common data format

  const handleDownload = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!startDate || !endDate) {
      alert('Please select a valid date range.');
      return;
    }

    setLoading(true);
    
    console.log(`Exporting data from ${startDate} to ${endDate} in ${exportFormat} format.`);

    // --- Mocking the Download Process ---
    setTimeout(() => {
      setLoading(false);
      console.log('Download complete.');
      
      // In a real application, the server would return a file stream here.
      alert(`Success! Your journal entries (${startDate} to ${endDate}) are ready to download as a ${exportFormat} file.`);
      
      // Reset dates for a fresh export, or keep them for subsequent exports
      // setStartDate('');
      // setEndDate('');

    }, 2000); // Simulate a 2-second server processing delay
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 pb-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        
        {/* --- Header --- */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Export Journal Data
        </h1>
        <p className="text-gray-600 mb-6">
          Select your desired format and a date range to download your entries.
        </p>

        <form onSubmit={handleDownload} className="space-y-6">
          
          {/* --- 1. Select Format --- */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Select Export Format
            </label>
            <div className="flex space-x-4">
              {exportFormats.map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setExportFormat(format)}
                  className={`
                    flex-1 py-3 px-4 text-center text-sm font-semibold rounded-lg border transition duration-150
                    ${exportFormat === format
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* --- 2. Select Date Range --- */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Select Date Range
            </label>
            <div className="flex space-x-4">
              {/* Start Date */}
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-sm text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
              </div>

              {/* End Date */}
              <div className="flex-1">
                <label htmlFor="endDate" className="block text-sm text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
              </div>
            </div>
          </div>

          {/* --- 3. Download Button --- */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 text-lg font-medium rounded-lg shadow-md transition duration-150 flex items-center justify-center
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
                  Preparing Download...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download Entries
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ExportPage;