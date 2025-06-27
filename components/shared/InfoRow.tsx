interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  const valueStr = value?.toString() ?? '—';

  return (
    <div
      className="
        w-full max-w-screen-md
        mx-auto
        flex items-center
        py-2
        px-4
        sm:px-0
      "
      style={{ maxWidth: '100vw' }}
    >
      {/* Label */}
      { /*<div
        className="primary-text-gradient w-[180px] text-left whitespace-nowrap pr-4 flex-shrink-0 text-sm sm:text-base"
        style={{ marginLeft: 0 }}
      >*/ }
      <div
        className="primary-text-gradient w-[180px] text-left wordwrap pr-4 flex-shrink-0 text-sm sm:text-base"
        style={{ marginLeft: 0 }}
      >
        {label}
      </div>

      {/* Value */}
      { /* <div
        className="
          text-dark400_light700 text-left text-sm sm:text-base flex-grow
          overflow-hidden
          whitespace-nowrap
          sm:whitespace-nowrap
          sm:text-ellipsis
          break-words
          sm:break-normal
        "
        title={valueStr}
      > */ }
        <div
        className="
          text-dark400_light700 text-left text-sm sm:text-base flex-grow
          overflow-hidden
          wordwrap
          sm:wordwrap
          sm:text-ellipsis
          break-words
          sm:break-normal
        "
        title={valueStr}
      >

        {valueStr}
      </div>
    </div>
  );
};


export default InfoRow;
