import React from 'react';

interface FantaCanProps {
  color: string;
  flavorName: string;
  isZero?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const FantaCan: React.FC<FantaCanProps> = ({ 
  color, 
  flavorName, 
  isZero = false, 
  size = 'md',
  className = ""
}) => {
  const sizeClasses = {
    sm: 'w-12 h-20 border-2',
    md: 'w-32 h-52 border-4',
    lg: 'w-48 h-80 border-4',
    xl: 'w-64 h-[28rem] border-8'
  };

  const textClasses = {
    sm: 'text-[8px]',
    md: 'text-[12px]',
    lg: 'text-lg',
    xl: 'text-2xl'
  };

  const logoClasses = {
    sm: 'text-[10px]',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <div className={`relative flex flex-col items-center group ${className}`}>
      {/* Top Rim */}
      <div className={`
        ${size === 'sm' ? 'w-10 h-2' : size === 'md' ? 'w-28 h-4' : size === 'lg' ? 'w-40 h-6' : 'w-56 h-8'} 
        bg-gray-300 border-black rounded-t-full z-20 
        ${size === 'sm' ? 'border-2' : size === 'xl' ? 'border-8' : 'border-4'}
      `}></div>

      {/* Can Body */}
      <div 
        className={`relative ${sizeClasses[size]} rounded-b-[2rem] overflow-hidden shadow-solid transition-transform group-hover:scale-105 duration-300`}
        style={{ backgroundColor: color }}
      >
        {/* Lighting Glare */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-black/30 pointer-events-none"></div>
        
        {/* Metal Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-400/50 border-t-2 border-black/20"></div>

        {/* Sticker / Label */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white border-black rotate-[-8deg] px-2 py-4 w-[90%] 
          flex flex-col items-center justify-center shadow-solid-sm
          ${size === 'sm' ? 'border-2 p-1' : size === 'xl' ? 'border-8' : 'border-4'}
        `}>
          <div className={`font-display text-fanta-blue leading-none ${logoClasses[size]}`}>
            FANTA
          </div>
          <div className={`font-sans font-black text-fanta-blue uppercase tracking-tighter truncate w-full text-center ${textClasses[size]}`}>
            {flavorName}
          </div>
          
          {isZero && (
            <div className="absolute -bottom-3 -right-2 bg-black text-white px-2 py-0.5 font-display text-[10px] rotate-12 border-2 border-black">
              ZERO
            </div>
          )}
        </div>

        {/* Bubbles Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
      </div>
    </div>
  );
};

export default FantaCan;
