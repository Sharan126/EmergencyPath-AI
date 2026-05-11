import * as authService from '../services/authService.js';

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await authService.updateUserProfile(req.user.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
