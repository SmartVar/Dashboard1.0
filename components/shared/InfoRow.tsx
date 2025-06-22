interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  const valueStr = value?.toString() ?? '—';
  const isMultiline = valueStr.includes('\n') || valueStr.length > 100;

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      {/* Label */}
      <span className="primary-text-gradient sm:min-w-[160px] font-semibold">
        {label}
      </span>

      {/* Value */}
      {isMultiline ? (
        <p className="text-dark400_light700 whitespace-pre-line">{valueStr}</p>
      ) : (
        <span
          className="text-dark400_light700 truncate"
          title={valueStr}
        >
          {valueStr}
        </span>
      )}
    </div>
  );
};
export default InfoRow;
