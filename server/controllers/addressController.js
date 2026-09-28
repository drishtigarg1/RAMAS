import Address from "../models/Address.js";

const allowedLabels = new Set(["Home", "Work", "College", "Office", "Other"]);

function validateAddress(body) {
  const required = ["fullName", "phone", "addressLine1", "city", "state", "postalCode"];
  const missing = required.find((key) => !String(body[key] || "").trim());
  if (missing) return `Please provide ${missing}.`;
  if (!/^\d{6}$/.test(String(body.postalCode).trim())) return "PIN code must be 6 digits.";
  if (!/^[6-9]\d{9}$/.test(String(body.phone).replace(/\D/g, ""))) return "Please provide a valid 10-digit phone number.";
  if (body.label && !allowedLabels.has(body.label)) return "Invalid address label.";
  return null;
}

export const listAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
  res.json(addresses);
};

export const createAddress = async (req, res) => {
  const validationError = validateAddress(req.body);
  if (validationError) return res.status(400).json({ message: validationError });
  const existing = await Address.countDocuments({ user: req.user._id });
  const address = await Address.create({ ...req.body, user: req.user._id, isDefault: Boolean(req.body.isDefault) || existing === 0 });
  if (address.isDefault) await Address.updateMany({ user: req.user._id, _id: { $ne: address._id } }, { $set: { isDefault: false } });
  res.status(201).json(address);
};

export const updateAddress = async (req, res) => {
  const validationError = validateAddress(req.body);
  if (validationError) return res.status(400).json({ message: validationError });
  const address = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true });
  if (!address) return res.status(404).json({ message: "Address not found." });
  if (address.isDefault) await Address.updateMany({ user: req.user._id, _id: { $ne: address._id } }, { $set: { isDefault: false } });
  res.json(address);
};

export const deleteAddress = async (req, res) => {
  const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!address) return res.status(404).json({ message: "Address not found." });
  if (address.isDefault) {
    const replacement = await Address.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (replacement) await Address.findByIdAndUpdate(replacement._id, { isDefault: true });
  }
  res.json({ success: true });
};

export const setDefaultAddress = async (req, res) => {
  const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
  if (!address) return res.status(404).json({ message: "Address not found." });
  await Address.updateMany({ user: req.user._id }, { $set: { isDefault: false } });
  address.isDefault = true;
  await address.save();
  res.json(address);
};
