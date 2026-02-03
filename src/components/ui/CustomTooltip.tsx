import { Tooltip } from 'react-tooltip';
import React from 'react';

type TooltipProps = React.ComponentProps<typeof Tooltip>;

interface CustomTooltipProps extends Omit<TooltipProps, 'className' | 'variant' | 'classNameArrow'> {
    className?: string;
    classNameArrow?: string;
}

export const CustomTooltip = ({
    className = '',
    classNameArrow = '',
    ...props
}: CustomTooltipProps) => {
    const baseStyles = 'px-3 py-2 text-sm text-white rounded-[16px] whitespace-nowrap shadow-lg z-50 border';

    return (
        <Tooltip
            {...props}
            className={`${baseStyles} ${className}`}
            classNameArrow={classNameArrow}
            style={{
                backgroundColor: 'var(--bg-black)',
                borderColor: 'var(--color-gold-primary)',
                ...props.style
            }}
        />
    );
};
