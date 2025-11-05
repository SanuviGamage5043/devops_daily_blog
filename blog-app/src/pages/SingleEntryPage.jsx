import React from 'react';

// Mock data for a single entry
const mockEntry = {
  id: 1,
  title: 'Mindful Morning Walk & Reflection',
  date: 'Wednesday, November 5, 2025',
  time: '11:06 AM',
  mood: 'Happy',
  content: `
    Today started with a wonderful, crisp morning walk. I focused on mindful breathing and observing the changing colors of the autumn leaves. It truly helped set a positive tone for the entire day.

    I spent some time reviewing my goals for the week and feel highly motivated. The main challenge I faced was an unexpected delay in the project I'm managing, but I handled it calmly and communicated effectively with the team. I feel proud of how I maintained my composure and found a quick solution.

    Looking ahead, I need to dedicate more time to that long-term personal project. It’s been pushed back too many times. I'm scheduling a deep-work block for tomorrow morning.

    ---
    This is the full content of the journal entry. A clean, spacious design makes long-form text much easier to read and absorb. This layout is perfect for focusing on the details and attachments without distraction.
  `,
  tags: ['personal', 'reflection', 'goals', 'mindfulness'],
  attachments: [
    { name: 'Autumn-Photo-1.jpg', size: '1.2 MB', type: 'image' },
    { name: 'Meeting-Notes.pdf', size: '200 KB', type: 'document' },
  ],
};

const SingleEntryPage = () => {
  // Helper function to get color for mood tag
  const getMoodClasses = (mood) => {
    switch (mood) {
      case 'Happy': return 'bg-yellow-100 text-yellow-800';
      case 'Focused': return 'bg-indigo-100 text-indigo-800';
    //   case default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock handlers for buttons
  const handleEdit = () => {
    console.log(`Navigating to edit page for entry: ${mockEntry.id}`);
    alert(`Redirecting to /edit/${mockEntry.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the entry "${mockEntry.title}"? This action cannot be undone.`)) {
      console.log(`Deleting entry: ${mockEntry.id}`);
      alert('Entry Deleted (Navigating back to entries list)');
      // In a real app: API call to delete, then redirect to /entries
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12">
      <div className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200">

        {/* --- Header & Action Buttons --- */}
        <div className="flex justify-between items-center mb-10 border-b pb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            {mockEntry.title}
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150 flex items-center"
            >
              {/* Edit Icon */}
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition duration-150 flex items-center"
            >
              {/* Delete Icon */}
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              Delete
            </button>
          </div>
        </div>
        
        {/* --- Metadata Section (Mood, Date, Time) --- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 mb-10">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">Date:</span>
            <span>{mockEntry.date}</span>
            <span>at {mockEntry.time}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">Mood:</span>
            <span className={`${getMoodClasses(mockEntry.mood)} text-xs font-bold px-3 py-1 rounded-full uppercase`}>
              {mockEntry.mood}
            </span>
          </div>
        </div>

        {/* --- Full Content --- */}
        <div className="prose max-w-none text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-12">
          {mockEntry.content}
        </div>

        {/* --- Tags Section --- */}
        <div className="mb-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {mockEntry.tags.map((tag, index) => (
              <span key={index} className="text-sm text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full font-medium">
                # {tag}
              </span>
            ))}
          </div>
        </div>

        {/* --- Attachments Section --- */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Attachments</h3>
          <div className="space-y-3">
            {mockEntry.attachments.length > 0 ? (
              mockEntry.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-3">
                    {/* File Icon based on type */}
                    {attachment.type === 'image' && (
                       <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                    )}
                    {attachment.type === 'document' && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path></svg>
                    )}
                    
                    <span className="font-medium text-gray-700">{attachment.name}</span>
                    <span className="text-xs text-gray-500">({attachment.size})</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No files attached to this entry.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleEntryPage;