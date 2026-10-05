import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, email, subject, and message are required." });
  }

  if (!/^\S+@\S+\.\S+$/.test(email) || message.trim().length > 5000) {
    return res.status(400).json({ message: "Please provide a valid email and message." });
  }

  const contact = await Contact.create({
    name: name.trim().slice(0, 120),
    email: email.trim().toLowerCase(),
    subject: subject.trim().slice(0, 200),
    message: message.trim(),
  });

  return res.status(201).json({ message: "Your message has been sent.", contactId: contact._id });
};

export const listContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 }).limit(200);
  return res.json(contacts);
};

export const markContactRead = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!contact) return res.status(404).json({ message: "Message not found." });
  return res.json(contact);
};

export const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return res.status(404).json({ message: "Message not found." });
  return res.json({ message: "Message deleted." });
};
