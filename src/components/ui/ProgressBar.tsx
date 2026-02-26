type ProgressBarProps = {
  label: string;
  value: number; // 0 - 100
};

export function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-white/70">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-white/80 transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
