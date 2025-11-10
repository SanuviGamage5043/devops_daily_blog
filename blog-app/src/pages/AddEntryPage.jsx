import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";

const AddEntryPage = () => {
  const navigate = useNavigate();

  // Mood dropdown data
  const moods = [
    { label: "Neutral", emoji: "😐", value: "neutral" },
    { label: "Happy", emoji: "😀", value: "happy" },
    { label: "Sad", emoji: "😔", value: "sad" },
    { label: "Excited", emoji: "🤩", value: "excited" },
    { label: "Tired", emoji: "😴", value: "tired" },
  ];

  // 🧠 State for form data
  const [formState, setFormState] = useState({
    title: "",
    mood: "neutral",
    content: "",
    tags: "",
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // 📝 Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📎 Handle file input
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormState((prev) => ({
      ...prev,
      files: files,
    }));
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const data = new FormData();
      data.set("title", formState.title);
      data.set("mood", formState.mood);
      data.set("content", formState.content);
      data.set("tags", formState.tags);
      data.set("userId", "67300fa89a9e7c1234a5678b"); // Replace later with logged user

      // For multiple files -> must use append
      Array.from(formState.files).forEach((file) => {
        data.append("files", file);
      });

      await axios.post("http://localhost:5000/entries", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Entry saved successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Error saving entry:", error);
      setMessage("❌ Failed to save entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ❌ Cancel handler
  const handleCancel = () => navigate("/dashboard");

  const currentMood = moods.find((m) => m.value === formState.mood);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="flex items-start justify-center pt-10 pb-10 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">
            New Journal Entry
          </h1>

          {/* Feedback Message */}
          {message && (
            <div
              className={`mb-4 text-center font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Give your entry a title..."
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                required
              />
            </div>

            {/* Mood Dropdown */}
            <div>
              <label
                htmlFor="mood"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                How are you feeling?
              </label>
              <div className="relative">
                <select
                  id="mood"
                  name="mood"
                  value={formState.mood}
                  onChange={handleChange}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition duration-150"
                >
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </option>
                  ))}
                </select>

                {/* Dropdown icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 
                      10.586l3.293-3.293a1 1 0 111.414 
                      1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 
                      0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <span className="absolute top-0 left-0 pt-3 pl-3 text-xl pointer-events-none">
                  {currentMood ? currentMood.emoji : "😐"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                value={formState.content}
                onChange={handleChange}
                placeholder="Write your thoughts here..."
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-y"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="files"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Upload Images/Files (Optional)
              </label>
              <input
                type="file"
                name="files"
                id="files"
                multiple
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                           file:rounded-full file:border-0 file:text-sm file:font-semibold 
                           file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formState.tags}
                onChange={handleChange}
                placeholder="work, personal, goals..."
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition duration-150 ${
                  isSubmitting
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntryPage;
