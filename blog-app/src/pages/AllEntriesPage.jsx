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
  const navigate = useNavigate();

  // Fetch all user entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://65.2.128.22:5000/entries/`, {
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
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`http://65.2.128.22:5000/entries/${id}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <NavBar />
      <div className="max-w-5xl mx-auto p-6 pt-12">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Entries</h1>

        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-6"
        />

        {loading ? (
          <div className="text-center text-gray-500 p-6">Loading...</div>
        ) : filteredEntries.length > 0 ? (
          <div className="space-y-5">
            {filteredEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{entry.title}</h2>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`${getMoodClasses(entry.mood)} text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase`}>
                        {entry.mood}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 line-clamp-3">{entry.content}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.tags?.map((tag, i) => (
                        <span key={i} className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry._id)}
                      className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 transition"
                      title="Edit Entry"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-gray-100 transition"
                      title="Delete Entry"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-2xl shadow-md text-gray-500">
            No entries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEntriesPage;