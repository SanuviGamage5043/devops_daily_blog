
import NavBar from "../components/NavBar.jsx";

const HomePage = () => {
  // Mock data
  const stats = [
    { label: "Total Entries", value: "1", icon: "📝" },
    { label: "Most Common Mood", value: "Happy", icon: "😊" },
    { label: "This Month", value: "1", icon: "🗓️" },
  ];

  const actions = [
    { label: "New Entry", icon: "➕", primary: true },
    { label: "All Entries", icon: "📖" },
    { label: "Mood Trends", icon: "📈" },
    { label: "Settings", icon: "⚙️" },
  ];

  const recentEntry = {
    title: "aaaaaaa",
    content: "hhhhhhhh",
    date: "Wednesday, November 5, 2025",
    mood: "Happy",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Dashboard Content */}
      <main className="max-w-8xl mx-auto px-4 py-10">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-lg text-gray-500">Continue your journaling journey</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-md text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-xl text-center shadow-md transition duration-200 ease-in-out ${
                action.primary
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white col-span-2 sm:col-span-1"
                  : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-700"
              }`}
              style={action.primary ? { minHeight: "100px" } : {}}
            >
              <span
                className={`text-2xl mb-1 ${
                  action.primary ? "text-white" : "text-gray-600"
                }`}
              >
                {action.icon}
              </span>
              <span
                className={`font-semibold ${
                  action.primary ? "text-white" : "text-gray-800"
                }`}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Recent Entries Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Entries
        </h3>

        {/* Single Recent Entry Card */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-yellow-500 shadow-md flex justify-between items-start hover:shadow-lg transition duration-200">
          <div>
            <h4 className="text-lg font-bold text-gray-900">
              {recentEntry.title}
            </h4>
            <p className="text-gray-600 my-1">{recentEntry.content}</p>
            <p className="text-sm text-gray-400">{recentEntry.date}</p>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase self-center">
            {recentEntry.mood}
          </span>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
