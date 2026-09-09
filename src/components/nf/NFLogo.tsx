import React from 'react';

interface NFLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  showText?: boolean;
  className?: string;
}

export const NFLogo: React.FC<NFLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: {
      imgSize: 'w-9 h-9 sm:w-10 sm:h-10',
      nfText: 'text-lg sm:text-xl',
      studioText: 'text-xs sm:text-sm',
      subText: 'text-[8px] sm:text-[9px]',
      gap: 'gap-2 sm:gap-2.5',
    },
    md: {
      imgSize: 'w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14',
      nfText: 'text-xl sm:text-2xl md:text-3xl',
      studioText: 'text-xs sm:text-sm md:text-base',
      subText: 'text-[9px] sm:text-[10px] md:text-[11px]',
      gap: 'gap-2.5 sm:gap-3',
    },
    lg: {
      imgSize: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20',
      nfText: 'text-2xl sm:text-3xl md:text-4xl',
      studioText: 'text-sm sm:text-lg md:text-xl',
      subText: 'text-[10px] sm:text-xs md:text-sm',
      gap: 'gap-3 sm:gap-4',
    },
    xl: {
      imgSize: 'w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28',
      nfText: 'text-3xl sm:text-4xl md:text-5xl',
      studioText: 'text-base sm:text-xl md:text-2xl',
      subText: 'text-xs sm:text-sm md:text-base',
      gap: 'gap-3 sm:gap-4 md:gap-5',
    },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${current.gap} select-none ${className}`}>
      {/* 3D Metallic Shield Logo Image */}
      <div
        className={`relative flex-shrink-0 transition-transform duration-300 hover:scale-105 ${current.imgSize} rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-amber-300/40 bg-white`}
      >
        <img
          src="/nf-logo.jpg"
          alt="NF Venture Studio Logo"
          className="w-full h-full object-contain p-0.5"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('assets')) {
              target.src = './src/assets/nf-logo.jpg';
            }
          }}
        />
      </div>

      {/* Typography: "NF" + "Venture Studio" + "Naree Care Foundation" */}
      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none flex-wrap">
            {/* Bold NF */}
            <span
              className={`font-black tracking-tight font-sans ${current.nfText} ${
                variant === 'light' ? 'text-white' : 'text-[#081c3b]'
              }`}
            >
              NF
            </span>

            {/* Venture Studio */}
            <span
              className={`font-black tracking-tight ${current.studioText} ${
                variant === 'light' ? 'text-sky-300' : 'text-[#0284c7]'
              }`}
            >
              Venture Studio
            </span>
          </div>

          {/* Naree Care Foundation Subtitle */}
          {showSubtitle && (
            <span
              className={`font-bold tracking-wider uppercase mt-0.5 sm:mt-1 truncate ${current.subText} ${
                variant === 'light' ? 'text-amber-400' : 'text-[#d97706]'
              }`}
            >
              Naree Care Foundation
            </span>
          )}
        </div>
      )}
    </div>
  );
};
