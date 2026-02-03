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
    return (
        <Tooltip
            {...props}
            style={{
                zIndex: 1000
            }}
            opacity={1}
            className={className}
            classNameArrow={classNameArrow}
        />
    );
};
