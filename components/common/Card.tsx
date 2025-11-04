import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl border border-[#3A3A3A] p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;