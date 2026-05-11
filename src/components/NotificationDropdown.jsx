import React from 'react';
import { Bell, Check, Trash2, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import './NotificationDropdown.css';

const NotificationDropdown = ({ notifications, markAsRead, markAllAsRead, clearAll, onClose }) => {
  
  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertOctagon size={18} className="notification-icon critical" />;
      case 'warning': return <AlertTriangle size={18} className="notification-icon warning" />;
      default: return <Info size={18} className="notification-icon info" />;
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="notification-dropdown" onClick={e => e.stopPropagation()}>
      <div className="notification-header">
        <h3>
          <Bell size={16} /> Notifications
        </h3>
        <div className="notification-actions">
          <button onClick={markAllAsRead} className="btn-notif-action blue">
            <Check size={12} /> Mark All Read
          </button>
          <span className="notification-divider">|</span>
          <button onClick={clearAll} className="btn-notif-action red">
            <Trash2 size={12} /> Clear All
          </button>
        </div>
      </div>
      
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            No notifications available
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
              onClick={() => { if (!notif.isRead) markAsRead(notif.id); }}
            >
              <div className="notification-content">
                <div>{getIcon(notif.type)}</div>
                <div className="notification-body">
                  <div className="notification-title-row">
                    <h4 className={`notification-title ${!notif.isRead ? 'unread' : 'read'}`}>
                      {notif.title}
                    </h4>
                    <span className="notification-time">
                      {formatTime(notif.timestamp)}
                    </span>
                  </div>
                  <p className="notification-desc">
                    {notif.description}
                  </p>
                </div>
                {!notif.isRead && <div className="unread-dot"></div>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
