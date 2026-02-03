import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    variant?: 'default' | 'dark';
    renderButtonContent?: (selectedOption: DropdownOption | undefined) => ReactNode;
    renderOptionContent?: (option: DropdownOption) => ReactNode;
}

export const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = 'Select...',
    className = '',
    variant = 'dark',
    renderButtonContent,
    renderOptionContent
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const updatePosition = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setMenuPosition({
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                    width: rect.width
                });
            }
        };

        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isClickInsideButton = buttonRef.current?.contains(target);
            const isClickInsideMenu = menuRef.current?.contains(target);

            if (!isClickInsideButton && !isClickInsideMenu) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
    };

    const baseStyles = 'relative w-full';
    const variantStyles = {
        default: 'bg-slate-800 border border-slate-700 text-white',
        dark: 'bg-black/80 border border-white/10 text-white'
    };

    const buttonStyles = {
        default: 'bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500',
        dark: 'bg-black/80 border border-white/10 text-white rounded-lg px-3 py-2 focus:border-white/20 focus:ring-0'
    };

    const optionStyles = {
        default: 'bg-slate-800 hover:bg-slate-700',
        dark: 'bg-black/80 hover:bg-white/10'
    };

    return (
        <>
            <div ref={dropdownRef} className={`${baseStyles} ${className}`}>
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${buttonStyles[variant]} w-full flex items-center justify-between transition-colors text-xs`}
                >
                    {renderButtonContent ? (
                        renderButtonContent(selectedOption)
                    ) : (
                        <span className={selectedOption ? '' : 'text-white/30'}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: `${menuPosition.top}px`,
                                left: `${menuPosition.left}px`,
                                width: `${menuPosition.width}px`,
                                zIndex: 9999
                            }}
                            className={`${variantStyles[variant]} rounded-lg border border-white/10 shadow-lg max-h-60 overflow-auto`}
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`${optionStyles[variant]} w-full text-left px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${value === option.value ? 'bg-white/10 font-bold' : ''
                                        }`}
                                >
                                    {renderOptionContent ? renderOptionContent(option) : option.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
