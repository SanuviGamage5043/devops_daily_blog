import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";

const AddEntryPage = () => {
  const navigate = useNavigate();
  const moods = [
    { label: "Neutral", emoji: "😐", value: "neutral" },
    { label: "Happy", emoji: "😀", value: "happy" },
    { label: "Sad", emoji: "😔", value: "sad" },
    { label: "Excited", emoji: "🤩", value: "excited" },
    { label: "Tired", emoji: "😴", value: "tired" },
  ];

  const [formState, setFormState] = useState({ title: "", mood: "neutral", content: "", tags: "", files: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // ✅ Correctly read token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormState((prev) => ({ ...prev, files: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", formState.title);
      formData.append("mood", formState.mood);
      formData.append("content", formState.content);
      formData.append("tags", formState.tags);
      Array.from(formState.files).forEach((file) => formData.append("files", file));

      await axios.post("http://localhost:5000/entries", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Entry saved successfully!");
      setTimeout(() => navigate("/entries"), 1500);
    } catch (error) {
      console.error("Error saving entry:", error);
      setMessage("❌ Failed to save entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate("/dashboard");
  const currentMood = moods.find((m) => m.value === formState.mood);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex items-start justify-center pt-10 pb-10 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">New Journal Entry</h1>
          {message && <div className={`mb-4 text-center font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={formState.title} onChange={handleChange} placeholder="Give your entry a title..." className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">How are you feeling?</label>
              <div className="relative">
                <select name="mood" value={formState.mood} onChange={handleChange} className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500">
                  {moods.map((m) => <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>)}
                </select>
                <span className="absolute top-0 left-0 pt-3 pl-3 text-xl pointer-events-none">{currentMood?.emoji || "😐"}</span>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Content</label>
              <textarea name="content" rows={10} value={formState.content} onChange={handleChange} placeholder="Write your thoughts here..." className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 resize-y" required />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Upload Images/Files (Optional)</label>
              <input type="file" multiple onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formState.tags} onChange={handleChange} placeholder="work, personal, goals..." className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={handleCancel} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={isSubmitting} className={`px-6 py-2 rounded-lg text-white font-medium shadow-md ${isSubmitting ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}>{isSubmitting ? "Saving..." : "Save Entry"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntryPage;
