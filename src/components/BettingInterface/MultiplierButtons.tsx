interface MultiplierButtonsProps {
  onHalf: () => void;
  onDouble: () => void;
  onMax: () => void;
}

export const MultiplierButtons = ({
  onHalf,
  onDouble,
  onMax
}: MultiplierButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onHalf}
        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5"
      >
        ½
      </button>
      <button
        onClick={onDouble}
        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5"
      >
        2×
      </button>
      <button
        onClick={onMax}
        className="flex-1 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-sm font-bold text-amber-500 transition-colors border border-amber-500/20"
      >
        MAX
      </button>
    </div>
  );
};
