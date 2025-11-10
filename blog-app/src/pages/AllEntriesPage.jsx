import { useState } from 'react';
import NavBar from '../components/NavBar.jsx'; 

// Mock data for journal entries
const mockEntries = [
  {
    id: 1,
    title: 'aaaaaaa',
    date: '11/5/2025',
    mood: 'Happy',
    content: 'hhhhhhhh',
    tags: ['pppp'],
  },
  {
    id: 2,
    title: 'Learning React Hooks',
    date: '11/4/2025',
    mood: 'Focused',
    content: 'Spent the whole afternoon practicing useState and useEffect...',
    tags: ['work', 'code', 'learning'],
  },
  {
    id: 3,
    title: 'Weekend Trip Planning',
    date: '11/3/2025',
    mood: 'Excited',
    content:
      'Finalized the itinerary for the mountain hike. Need to pack warm clothes.',
    tags: ['personal', 'travel'],
  },
  {
    id: 4,
    title: 'A difficult conversation',
    date: '11/2/2025',
    mood: 'Neutral',
    content: 'Managed to resolve the conflict with a colleague peacefully...',
    tags: ['work', 'reflection'],
  },
];

const AllEntriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(mockEntries);

  // Simple search filter
  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Mock functions
  const handleView = (id) => console.log(`Viewing entry: ${id}`);
  const handleEdit = (id) => console.log(`Editing entry: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter((entry) => entry.id !== id));
      console.log(`Deleted entry: ${id}`);
    }
  };

  // Helper function to color mood tags
  const getMoodClasses = (mood) => {
    switch (mood) {
      case 'Happy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Excited':
        return 'bg-pink-100 text-pink-800';
      case 'Focused':
        return 'bg-indigo-100 text-indigo-800';
      case 'Neutral':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar added at the top */}
      <NavBar />

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto p-6 pt-12">
        {/* --- Page Title --- */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Entries</h1>

        {/* --- Search Bar --- */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, content, mood, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Showing {filteredEntries.length} entries.
          </div>
        </div>

        {/* --- Entries List --- */}
        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer relative"
                onClick={() => handleView(entry.id)}
              >
                {/* Entry Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {entry.title}
                </h2>

                {/* Mood + Date */}
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`${getMoodClasses(
                      entry.mood
                    )} text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase`}
                  >
                    {entry.mood}
                  </span>
                  <span className="text-sm text-gray-500">{entry.date}</span>
                </div>

                {/* Content Snippet */}
                <p className="text-gray-600 line-clamp-2 mb-2">
                  {entry.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(entry.id);
                    }}
                    className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100 transition duration-150"
                    title="Edit Entry"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100 transition duration-150"
                    title="Delete Entry"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-10 bg-white rounded-lg shadow-md text-gray-500">
              No entries found matching "{searchTerm}".
            </div>
          )}
        </div>

        {/* --- Pagination Placeholder --- */}
        <div className="mt-8 flex justify-center">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.06l-4.5-4.25a.75.75 0 010-1.06l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a
              href="#"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              2
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
              ...
            </span>
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.06l4.5 4.25a.75.75 0 010 1.06l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AllEntriesPage;
