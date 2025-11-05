import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// --- Mock Data ---
const mockEntryData = {
  id: 42,
  title: 'Mindful Morning Walk & Reflection',
  mood: 'happy',
  content:
    "Today started with a wonderful, crisp morning walk. I focused on mindful breathing and observing the changing colors of the autumn leaves. It truly helped set a positive tone for the entire day.",
  tags: 'personal, reflection, goals',
  existingAttachments: [
    { id: 101, name: 'Autumn-Photo-1.jpg', size: '1.2 MB', type: 'image' },
    { id: 102, name: 'Meeting-Notes.pdf', size: '200 KB', type: 'document' },
  ],
};

const moods = [
  { label: 'Neutral', emoji: '😐', value: 'neutral' },
  { label: 'Happy', emoji: '😀', value: 'happy' },
  { label: 'Sad', emoji: '😔', value: 'sad' },
  { label: 'Excited', emoji: '🤩', value: 'excited' },
  { label: 'Tired', emoji: '😴', value: 'tired' },
];

const EditEntryPage = () => {
  const { id } = useParams();

  const [formState, setFormState] = useState({
    title: '',
    mood: 'neutral',
    content: '',
    tags: '',
  });
  const [existingAttachments, setExistingAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Simulate Data Fetch ---
  useEffect(() => {
    console.log(`Fetching entry data for ID: ${id}`);
    setTimeout(() => {
      setFormState({
        title: mockEntryData.title,
        mood: mockEntryData.mood,
        content: mockEntryData.content,
        tags: mockEntryData.tags,
      });
      setExistingAttachments(mockEntryData.existingAttachments);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewFiles(e.target.files);
  };

  const handleRemoveAttachment = (attachmentId) => {
    if (window.confirm('Are you sure you want to remove this attachment?')) {
      setExistingAttachments((prev) =>
        prev.filter((att) => att.id !== attachmentId)
      );
      console.log(`Attachment ${attachmentId} removed.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Entry:', formState);
    console.log('Files to upload:', newFiles);
    alert('Changes Saved!');
  };

  const handleCancel = () => {
    alert(`Redirecting back to /entry/${id}`);
  };

  const currentMood = moods.find((m) => m.value === formState.mood);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-indigo-600">Loading entry #{id}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* --- NavBar --- */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* App Name */}
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xl">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.415 9.497 5 8 5c-4 0-4 4-4 4s-.5 2 4 2c4 0 4-4 4-4zM12 6.253c1.168.832 2.503 1.25 4 1.25 4 0 4-4 4-4s.5-2-4-2c-4 0-4 4-4 4z"
              />
            </svg>
            <span>My Journal</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-gray-600 text-sm font-medium">
            <a href="/dashboard" className="hover:text-indigo-600">
              Home
            </a>
            <a href="/entries" className="hover:text-indigo-600">
              All Entries
            </a>
            <a href="/add-entry" className="hover:text-indigo-600">
              Add Entry
            </a>
            <a href="/analytics" className="hover:text-indigo-600">
              Mood Trends
            </a>
          </nav>

          {/* User Info */}
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-medium text-gray-800">John</span> |
            <button className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* --- Edit Form --- */}
      <div className="max-w-2xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">
          Edit Journal Entry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Mood */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              How are you feeling?
            </label>
            <div className="relative">
              <select
                name="mood"
                value={formState.mood}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-lg focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
              >
                {moods.map((mood) => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
              <span className="absolute top-0 left-0 pt-3 pl-3 text-xl pointer-events-none">
                {currentMood?.emoji}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              rows={8}
              value={formState.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
              required
            />
          </div>

          {/* Existing Attachments */}
          {existingAttachments.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Current Attachments ({existingAttachments.length})
              </h3>
              <ul className="space-y-2">
                {existingAttachments.map((att) => (
                  <li
                    key={att.id}
                    className="flex justify-between items-center text-sm text-gray-600"
                  >
                    <span className="truncate">{att.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5
                          4v6m4-6v6m1-10V4a1 1 0
                          00-1-1h-4a1 1 0
                          00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add New Files */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Add New Files
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formState.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEntryPage;
