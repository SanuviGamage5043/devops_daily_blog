import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch entries from backend
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(
          "http://65.2.128.22:5000/entries/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;
        setEntries(data);

        // Stats calculation
        const total = data.length;

        const moods = data.map((e) => e.mood);
        const mostCommonMood =
          moods.sort(
            (a, b) =>
              moods.filter((v) => v === a).length -
              moods.filter((v) => v === b).length
          ).pop() || "None";

        const thisMonth = data.filter((e) => {
          const entryDate = new Date(e.createdAt);
          const now = new Date();
          return (
            entryDate.getMonth() === now.getMonth() &&
            entryDate.getFullYear() === now.getFullYear()
          );
        }).length;

        setStats([
          { label: "Total Entries", value: total, icon: "📝" },
          { label: "Most Common Mood", value: mostCommonMood, icon: "😊" },
          { label: "This Month", value: thisMonth, icon: "🗓️" },
        ]);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };

    fetchEntries();
  }, [token]);

  const actions = [
    { label: "New Entry", icon: "➕", primary: true, path: "/add-entry" },
    { label: "All Entries", icon: "📖", path: "/entries" },
    { label: "Mood Trends", icon: "📈", path: "/analytics" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <NavBar />

      <main className="max-w-6xl mx-auto px-4 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-700">
            Welcome back 👋
          </h2>
          <p className="text-gray-600">
            Continue your Life Journal journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">
                    {stat.value}
                  </p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center p-5 rounded-xl shadow-md transition ${
                action.primary
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span className="font-semibold">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Recent Entries */}
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">
          Recent Entries
        </h3>

        {entries.length === 0 ? (
          <p className="text-gray-600">
            No entries yet. Start writing your first journal entry ✍️
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-400"
              >
                <h4 className="text-lg font-bold text-gray-800">
                  {entry.title}
                </h4>

                <p className="text-gray-600 my-2">{entry.content}</p>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>

                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full">
                    {entry.mood}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;