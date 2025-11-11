import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const moods = [
  { label: "Neutral", emoji: "😐", value: "neutral" },
  { label: "Happy", emoji: "😀", value: "happy" },
  { label: "Sad", emoji: "😔", value: "sad" },
  { label: "Excited", emoji: "🤩", value: "excited" },
  { label: "Tired", emoji: "😴", value: "tired" },
];

const EditEntryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formState, setFormState] = useState({
    title: "",
    mood: "neutral",
    content: "",
    tags: "",
  });

  const [existingAttachments, setExistingAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch entry from API ---
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const entry = res.data;
        setFormState({
          title: entry.title,
          mood: entry.mood,
          content: entry.content,
          tags: entry.tags,
        });
        setExistingAttachments(entry.attachments || []);
      } catch (err) {
        console.error("Error fetching entry:", err);
        alert("Failed to load entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleRemoveAttachment = (attachmentId) => {
    if (window.confirm("Are you sure you want to remove this attachment?")) {
      setExistingAttachments((prev) =>
        prev.filter((att) => att.id !== attachmentId)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.title);
      formData.append("mood", formState.mood);
      formData.append("content", formState.content);
      formData.append("tags", formState.tags);

      newFiles.forEach((file) => formData.append("files", file));

      // Update entry via API
      await axios.put(`http://localhost:5000/entries/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Entry updated successfully!");
      navigate("/entries");
    } catch (err) {
      console.error("Error updating entry:", err);
      alert("Failed to update entry");
    }
  };

  const handleCancel = () => navigate(-1);

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
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xl">
            My Journal
          </div>
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-medium text-gray-800">John</span> |
            <button className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">
              Logout
            </button>
          </div>
        </div>
      </header>

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
