import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Video,
  Clock,
  BookOpen,
  Sparkles,
  ChevronRight,
  CheckCheck
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToTab
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Video className="w-4 h-4 text-indigo-600" />;
      case 'accepted':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'journal':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'reminder':
      default:
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-black text-base text-slate-900">Notifikasi & Pengingat</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              title="Tandai semua terbaca"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Baca</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Tidak ada notifikasi baru saat ini.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkAsRead(notif.id);
                  if (notif.actionTab) {
                    onNavigateToTab(notif.actionTab);
                    onClose();
                  }
                }}
                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-start space-x-3 ${
                  !notif.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
