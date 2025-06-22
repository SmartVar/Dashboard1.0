interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  const valueStr = value?.toString() ?? '—';

  return (
    <div className="w-full flex justify-between items-center gap-2 py-1">
      {/* Label */}
      <span className="primary-text-gradient whitespace-nowrap text-sm sm:text-base">
        {label}
      </span>

      {/* Value */}
      <span
        className="text-dark400_light700 text-right text-sm sm:text-base truncate max-w-[60%]"
        title={valueStr}
      >
        {valueStr}
      </span>
    </div>
  );
};

export default InfoRow;
