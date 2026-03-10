import fs from "fs";
import path from "path";
import Entry from "../models/Entry.js";
import User from "../models/User.js";
import { Parser } from "json2csv";

// CREATE new entry
export const createEntry = async (req, res) => {
  try {
    const { title, mood, content, tags } = req.body;
    const uploadedFiles = req.files ? req.files.map(f => f.filename) : [];

    const entry = new Entry({
      userId: req.user.id,
      title,
      mood,
      content,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      files: uploadedFiles,
    });

    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

// READ all entries for logged-in user
export const getEntriesByUser = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};

// UPDATE entry
export const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (entry.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    const { title, mood, content, tags, removedFiles } = req.body;

    if (title) entry.title = title;
    if (mood) entry.mood = mood;
    if (content) entry.content = content;
    if (tags) entry.tags = tags.split(",").map(t => t.trim());

    // Remove files
    if (removedFiles && Array.isArray(removedFiles)) {
      removedFiles.forEach(filename => {
        const index = entry.files.indexOf(filename);
        if (index > -1) {
          const filePath = path.join("uploads", filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          entry.files.splice(index, 1);
        }
      });
    }

    // Add new files
    if (req.files && req.files.length > 0) {
      entry.files.push(...req.files.map(f => f.filename));
    }

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(500).json({ message: "Failed to update entry" });
  }
};

// DELETE entry
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (entry.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    // Delete uploaded files
    entry.files.forEach(filename => {
      const filePath = path.join("uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

// ANALYTICS
export const getAnalytics = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id });

    const moodCounts = entries.reduce((acc, e) => {
      if (!acc[e.mood]) acc[e.mood] = 0;
      acc[e.mood]++;
      return acc;
    }, {});

    const entriesPerMonth = entries.reduce((acc, e) => {
      const month = e.createdAt.toLocaleString("default", { month: "short", year: "numeric" });
      if (!acc[month]) acc[month] = 0;
      acc[month]++;
      return acc;
    }, {});

    res.json({
      moodDistribution: Object.entries(moodCounts).map(([name, value]) => ({ name, value })),
      entriesPerMonth: Object.entries(entriesPerMonth).map(([month, entries]) => ({ month, entries })),
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

// EXPORT
export const exportEntries = async (req, res) => {
  try {
    const { start, end, format } = req.query;
    if (!start || !end) return res.status(400).json({ message: "Start and end dates required" });

    const entries = await Entry.find({
      userId: req.user.id,
      createdAt: { $gte: new Date(start), $lte: new Date(end) },
    });

    if (format === "json") {
      res.setHeader("Content-Disposition", `attachment; filename=entries_${start}_to_${end}.json`);
      return res.json(entries);
    }

    if (format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(entries);
      res.setHeader("Content-Disposition", `attachment; filename=entries_${start}_to_${end}.csv`);
      res.setHeader("Content-Type", "text/csv");
      return res.send(csv);
    }

    if (format === "pdf") {
      // Simple placeholder: can use pdfkit or other library to generate actual PDF
      return res.status(501).json({ message: "PDF export not implemented yet" });
    }

    res.status(400).json({ message: "Unsupported format" });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Failed to export entries" });
  }
};