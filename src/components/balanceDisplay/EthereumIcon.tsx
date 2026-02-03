interface EthereumIconProps {
    className?: string;
}

export const EthereumIcon = ({ className }: EthereumIconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12 0L5.5 12.25L12 16.5L18.5 12.25L12 0Z"
                fill="currentColor"
            />
            <path
                d="M5.5 13.75L12 18L18.5 13.75L12 24L5.5 13.75Z"
                fill="currentColor"
            />
        </svg>
    );
};
