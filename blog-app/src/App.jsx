import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import AddEntryPage from "./pages/AddEntryPage";
import AllEntriesPage from "./pages/AllEntriesPage";
import SingleEntryPage from "./pages/SingleEntryPage";
// import EditEntryPage from "./pages/EditEntryPage";
import MoodAnalyticsPage from "./pages/MoodAnalyticsPage";
import ExportPage from "./pages/ExportPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-entry" element={<AddEntryPage />} />
        <Route path="/entries" element={<AllEntriesPage />} />
        <Route path="/entry/:id" element={<SingleEntryPage />} />
        {/* <Route path="/edit/:id" element={<EditEntryPage />} /> */}
        <Route path="/analytics" element={<MoodAnalyticsPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    
  );
}
