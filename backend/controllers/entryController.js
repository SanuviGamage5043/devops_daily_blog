import fs from "fs";
import path from "path";
import Entry from "../models/Entry.js";

/**
 * CREATE new entry
 */
export const createEntry = async (req, res) => {
  try {
    const { title, mood, content, tags } = req.body;

    const userId = req.user.id; // ✅ from JWT middleware

    const uploadedFiles = req.files ? req.files.map((file) => file.filename) : [];

    const entry = new Entry({
      user: userId, // store user reference
      title,
      mood,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      files: uploadedFiles,
    });

    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

/**
 * READ all entries for the logged-in user
 */
export const getEntriesByUser = async (req, res) => {
  try {
    const userIdFromJWT = req.user.id;

    // Optionally: check if requested userId matches JWT (for /user/:userId route)
    if (req.params.userId && req.params.userId !== userIdFromJWT) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const entries = await Entry.find({ user: userIdFromJWT }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};
//update entry
export const updateEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const { title, mood, content, tags, removedFiles } = req.body;
    const userId = req.user.id;

    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    if (entry.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Update basic fields
    if (title) entry.title = title;
    if (mood) entry.mood = mood;
    if (content) entry.content = content;
    if (tags) entry.tags = tags.split(",").map((t) => t.trim());

    // Remove files if requested
    if (removedFiles && Array.isArray(removedFiles)) {
      removedFiles.forEach((filename) => {
        const index = entry.files.indexOf(filename);
        if (index > -1) {
          const filePath = path.join("uploads", filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          entry.files.splice(index, 1);
        }
      });
    }

    // Add new uploaded files
    if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files.map((f) => f.filename);
      entry.files.push(...uploadedFiles);
    }

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(500).json({ message: "Failed to update entry" });
  }
};

/**
 * DELETE entry
 */
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Delete uploaded files
    entry.files.forEach((filename) => {
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
