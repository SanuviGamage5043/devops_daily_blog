import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";

const SingleEntryPage = () => {
  const { id } = useParams(); // entry ID from URL
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch entry from backend
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`http://65.2.128.22:5000/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntry(res.data);
      } catch (err) {
        console.error("Failed to fetch entry:", err);
        alert("Failed to load entry. Redirecting to entries list.");
        navigate("/entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id, token, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry? This cannot be undone.")) return;

    try {
      await axios.delete(`http://65.2.128.22:5000/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Entry deleted successfully!");
      navigate("/entries");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete entry. Try again.");
    }
  };

  const handleDownloadAttachment = (filename) => {
    const url = `http://65.2.128.22:5000/uploads/${filename}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getMoodClasses = (mood) => {
    switch (mood) {
      case "Happy":
        return "bg-yellow-100 text-yellow-800";
      case "Focused":
        return "bg-indigo-100 text-indigo-800";
      case "Sad":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!entry) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-4xl mx-auto bg-white mt-16 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b pb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-900">{entry.title}</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/entries/edit/${entry._id}`)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 mb-10">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">Date:</span>
            <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
            <span>at {new Date(entry.createdAt).toLocaleTimeString()}</span>
          </div>
          {entry.mood && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">Mood:</span>
              <span className={`${getMoodClasses(entry.mood)} text-xs font-bold px-3 py-1 rounded-full uppercase`}>{entry.mood}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose max-w-none text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-12">
          {entry.content}
        </div>

        {/* Tags */}
        {entry.tags?.length > 0 && (
          <div className="mb-10 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <span key={index} className="text-sm text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {entry.files?.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Attachments</h3>
            <div className="space-y-3">
              {entry.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <svg
                      className={`w-5 h-5 ${file.endsWith(".pdf") ? "text-blue-500" : "text-green-500"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {file.endsWith(".pdf") ? (
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                      ) : (
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                      )}
                    </svg>
                    <span className="font-medium text-gray-700">{file}</span>
                  </div>
                  <button
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={() => handleDownloadAttachment(file)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleEntryPage;