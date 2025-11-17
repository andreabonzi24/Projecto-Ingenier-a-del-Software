const emailRegex = /^\S+@\S+\.\S+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const normalizeString = (value = '') => value.trim();

const isValidEmail = (email = '') => emailRegex.test(email);

const isStrongPassword = (password = '') => strongPasswordRegex.test(password);

const sanitizeUserFields = (payload = {}) => ({
  name: normalizeString(payload.name || ''),
  email: normalizeString(payload.email || '').toLowerCase(),
  password: payload.password || '',
  phone: normalizeString(payload.phone || ''),
  ID: normalizeString(payload.ID || ''),
  companyCard: normalizeString(payload.companyCard || ''),
  healthCard: normalizeString(payload.healthCard || ''),
  specialty: normalizeString(payload.specialty || ''),
  licenseNumber: normalizeString(payload.licenseNumber || ''),
  centerId: normalizeString(payload.centerId || '')
});

module.exports = {
  sanitizeUserFields,
  isValidEmail,
  isStrongPassword
};
