import React from 'react';
import type { View } from '../types';
import { TasksIcon } from './icons/TasksIcon';
import { ProfileIcon } from './icons/ProfileIcon';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  theme: {
    buttonColor: string;
    hintColor: string;
  };
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, theme }) => {
  const navItems: { id: View; label: string; icon: React.FC<any> }[] = [
    { id: 'tasks', label: 'Tasks', icon: TasksIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ];

  return (
    <nav className="w-full bg-black/10 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-md mx-auto flex justify-around p-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200`}
              style={{ color: isActive ? theme.buttonColor : theme.hintColor }}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
