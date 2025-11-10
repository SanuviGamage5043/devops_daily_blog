import Entry from "../models/Entry.js";

// Create new entry
export const createEntry = async (req, res) => {
  try {
    const { userId, title, mood, content, tags, files } = req.body;

    const entry = new Entry({
      userId,
      title,
      mood,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      files: files || [],
    });

    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

// Get all entries for a user
export const getEntriesByUser = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};

// Get single entry
export const getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entry" });
  }
};

// Update entry
export const updateEntry = async (req, res) => {
  try {
    const updated = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Entry not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update entry" });
  }
};

// Delete entry
export const deleteEntry = async (req, res) => {
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
};
