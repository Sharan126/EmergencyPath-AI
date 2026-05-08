import React from 'react';
import { Camera, ShieldCheck, Mail, Phone, User as UserIcon } from 'lucide-react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  return (
    <div className="settings-panel animate-fade-in">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">User Profile</h2>
        <p className="settings-panel-desc">Manage your personal information, role access, and security settings.</p>
      </div>

      <div className="settings-section profile-header-section">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <UserIcon size={40} className="text-gray-400" />
          </div>
          <button className="avatar-upload-btn">
            <Camera size={14} />
          </button>
        </div>
        
        <div className="profile-header-info">
          <h3 className="profile-name">Sarah Jenkins</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="role-badge">
              <ShieldCheck size={12} /> System Administrator
            </span>
            <span className="status-badge-active">Online</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Last login: Today at 09:42 AM from IP 192.168.1.4</p>
        </div>
      </div>

      <div className="settings-section">
        <h4 className="settings-section-title">Personal Information</h4>
        <div className="grid-2col">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue="Sarah Jenkins" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input type="email" className="form-input w-full" defaultValue="sarah.j@emergencypath.gov" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-with-icon">
              <Phone size={16} className="input-icon" />
              <input type="tel" className="form-input w-full" defaultValue="+91 98765 43210" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-input" defaultValue="Central Command Ops" readOnly />
          </div>
        </div>
      </div>

      <div className="settings-section border-t border-gray-200 pt-6 mt-2">
        <h4 className="settings-section-title">Change Password</h4>
        <div className="grid-2col">
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
        </div>
        <button className="btn btn-primary mt-2">Update Profile</button>
      </div>

    </div>
  );
};

export default ProfileSettings;
