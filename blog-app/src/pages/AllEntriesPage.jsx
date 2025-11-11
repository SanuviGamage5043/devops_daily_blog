import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";

const AllEntriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/entries/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [token, userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`http://localhost:5000/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Failed to delete entry");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const getMoodClasses = (mood) => {
    switch (mood.toLowerCase()) {
      case "happy": return "bg-yellow-100 text-yellow-800";
      case "excited": return "bg-pink-100 text-pink-800";
      case "focused": return "bg-indigo-100 text-indigo-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      case "sad": return "bg-blue-100 text-blue-800";
      case "tired": return "bg-gray-200 text-gray-900";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Entries</h1>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
        />

        {loading ? (
          <div className="text-center text-gray-500 p-6">Loading...</div>
        ) : filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer relative"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">{entry.title}</h2>
              <span
                className={`${getMoodClasses(entry.mood)} text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase`}
              >
                {entry.mood}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>

              <p className="text-gray-600 line-clamp-2 mb-2">{entry.content}</p>
              <div className="flex flex-wrap gap-1">
                {entry.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(entry._id);
                  }}
                  className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100"
                  title="Edit Entry"
                >
                  ✏️
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(entry._id);
                  }}
                  className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100"
                  title="Delete Entry"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md text-gray-500">
            No entries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEntriesPage;
