import React from 'react';
import * as LucideIcons from 'lucide-react';

const PrimaryButton = ({
    text,
    icon: Icon,
    onClick,
}) => {

    return (
        <button
            onClick={onClick}
            className="group relative px-7 py-3 bg-gradient-to-r 
            from-blue-600/25 to-blue-500/15 text-white rounded-lg overflow-hidden border 
            border-white/10 transition-colors duration-500 hover:border-blue-500/30"
        >
            <div className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 bg-gradient-to-r 
            from-blue-600/20 to-blue-500/10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

            <span className="relative z-10 flex items-center gap-3">
                {Icon && (
                    <Icon
                        size={18}
                        className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
                    />
                )}
                {text && <span className="text-sm font-semibold shadow-lg tracking-tight opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {text}
                </span>}

            </span>

        </button>
    );
};

export default PrimaryButton;