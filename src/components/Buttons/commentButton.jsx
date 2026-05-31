import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export const CommentButton = ({ count = 0, setIsCommentSection }) => {

  const handlePress = () => {
    setIsCommentSection(true);
  };

  return (
    <button 
      onClick={handlePress}
      className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 bg-transparent border-0 cursor-pointer"
    >
      {/* Customizing Lucide icon properties */}
      <MessageSquare 
        size={20} 
        strokeWidth={2} 
        className="hover:scale-105 transition-transform"
      />
      
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
};