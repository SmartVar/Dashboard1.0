interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  const valueStr = value?.toString() ?? '—';
  const isMultiline = valueStr.includes('\n') || valueStr.length > 100;

  return (
    <div className="w-full relative">
      {/* Label: min width, no wrap, grows if longer */}
      <span className="primary-text-gradient inline-block min-w-[280px] whitespace-nowrap">
        {label}
      </span>

      {isMultiline ? (
        <p className="text-dark400_light700 mt-1 ml-[280px] whitespace-pre-line">{valueStr}</p>
      ) : (
        <span
          className="text-dark400_light700 truncate inline-block ml-4 max-w-[calc(100%-280px)] align-top"
          title={valueStr}
        >
          {valueStr}
        </span>
      )}
    </div>
  );
};

export default InfoRow;
