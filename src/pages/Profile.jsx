import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.put('/users/profile', formData);
      setUser(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-8 text-white">Loading profile...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and personal information</p>
      </div>

      <div className="profile-card">
        <div className="profile-cover">
          <div className="profile-avatar-wrapper">
            <User />
          </div>
        </div>
        
        <div className="profile-actions">
          {isEditing ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-outline" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: user.name, phone: user.phone });
                }}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button className="btn-outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-details">
          <h2>Personal Information</h2>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Full Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="profile-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              ) : (
                <div className="profile-value">{user.name}</div>
              )}
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <div className="profile-value text-gray-400">{user.email}</div>
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              {isEditing ? (
                <input 
                  type="tel" 
                  className="profile-input"
                  placeholder="Not provided"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <div className="profile-value">{user.phone || 'Not provided'}</div>
              )}
            </div>

            <div className="profile-field">
              <label>Role</label>
              <div className="profile-value">
                <span className="role-badge">{user.role}</span>
              </div>
            </div>

            <div className="profile-field">
              <label>Emergency ID</label>
              <div className="profile-value">{user.emergencyId}</div>
            </div>

            <div className="profile-field">
              <label>Account Status</label>
              <div className="profile-value">
                <span className={`status-badge ${user.accountStatus === 'Active' ? 'active' : ''}`}>
                  {user.accountStatus || 'Active'}
                </span>
              </div>
            </div>

            <div className="profile-field">
              <label>Last Login</label>
              <div className="profile-value">
                {new Date(user.lastLogin).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
