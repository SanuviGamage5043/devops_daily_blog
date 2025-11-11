import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch user entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/entries/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setEntries(data);

        // Calculate stats
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
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-8xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-lg text-gray-500">Continue your journaling journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-md text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl text-center shadow-md transition duration-200 ease-in-out ${
                action.primary
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white col-span-2 sm:col-span-1"
                  : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-700"
              }`}
              style={action.primary ? { minHeight: "100px" } : {}}
            >
              <span
                className={`text-2xl mb-1 ${action.primary ? "text-white" : "text-gray-600"}`}
              >
                {action.icon}
              </span>
              <span className={`font-semibold ${action.primary ? "text-white" : "text-gray-800"}`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Recent Entries */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet. Start journaling!</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white p-5 rounded-xl border-l-4 border-yellow-500 shadow-md flex justify-between items-start hover:shadow-lg transition duration-200"
              >
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{entry.title}</h4>
                  <p className="text-gray-600 my-1">{entry.content}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase self-center">
                  {entry.mood}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
