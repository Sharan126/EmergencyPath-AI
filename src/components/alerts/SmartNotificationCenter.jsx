import React from 'react';
import { Bell, Pin, CheckCircle, Share2, MoreVertical } from 'lucide-react';
import './SmartNotificationCenter.css';

const pinnedAlerts = [
  { id: 1, title: 'Multi-Vehicle Accident (Sector 4)', time: 'Active for 15m' },
  { id: 2, title: 'Apollo Hospital Level 1 Trauma Full', time: 'Active for 42m' }
];

const historyAlerts = [
  { id: 101, title: 'Oxygen shortage reported at City Care', time: '2 hours ago', status: 'resolved' },
  { id: 102, title: 'Ambulance KA-01-1234 speeding', time: '3 hours ago', status: 'acknowledged' }
];

const SmartNotificationCenter = () => {
  return (
    <div className="card smart-notification-center">
      <div className="notification-header">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-gray-700" />
          <h3 className="section-title !mb-0">NOTIFICATIONS</h3>
        </div>
        <div className="unread-badge">3 Unread</div>
      </div>

      {/* Pinned / Active Criticals */}
      <div className="notification-section">
        <h4 className="section-subtitle"><Pin size={12} /> Pinned / Ongoing</h4>
        <div className="pinned-list">
          {pinnedAlerts.map(alert => (
            <div key={alert.id} className="notification-item pinned-item">
              <div className="flex justify-between items-start mb-2">
                <span className="notif-title font-bold text-red-600">{alert.title}</span>
                <button className="icon-btn"><MoreVertical size={14} /></button>
              </div>
              <span className="notif-time">{alert.time}</span>
              <div className="notif-actions mt-2">
                <button className="action-btn"><CheckCircle size={12} /> Resolve</button>
                <button className="action-btn"><Share2 size={12} /> Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="notification-section flex-grow">
        <h4 className="section-subtitle">Alert History</h4>
        <div className="history-list">
          {historyAlerts.map(alert => (
            <div key={alert.id} className="notification-item history-item">
              <div className="flex justify-between items-center mb-1">
                <span className="notif-title text-gray-700">{alert.title}</span>
                <span className="notif-time">{alert.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {alert.status === 'resolved' ? (
                  <span className="status-badge resolved"><CheckCircle size={10} /> Resolved</span>
                ) : (
                  <span className="status-badge acknowledged">Acknowledged</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="notification-footer">
        <button className="btn btn-outline w-full text-xs py-2">Mark all as read</button>
      </div>
    </div>
  );
};

export default SmartNotificationCenter;
