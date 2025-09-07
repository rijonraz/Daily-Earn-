import React from 'react';
import { useTelegram } from '../hooks/useTelegram';

const ProfileView: React.FC = () => {
  const { user } = useTelegram();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white/50 mx-auto"></div>
          <p className="mt-4 text-white/80">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const { first_name, last_name, username, photo_url } = user;

  return (
    <div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg text-center">
      {photo_url ? (
        <img src={photo_url} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-white/20" />
      ) : (
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold border-2 border-white/20">
          {first_name.charAt(0)}
        </div>
      )}
      <h2 className="text-2xl font-bold">{first_name} {last_name || ''}</h2>
      {username && <p className="text-white/60 mt-1">@{username}</p>}
      
      <div className="mt-6 text-left space-y-3">
        <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-xs text-white/50">First Name</p>
            <p className="font-medium">{first_name}</p>
        </div>
        {last_name && (
            <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-xs text-white/50">Last Name</p>
                <p className="font-medium">{last_name}</p>
            </div>
        )}
        <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-xs text-white/50">Telegram User ID</p>
            <p className="font-mono text-sm">{user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
