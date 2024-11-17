interface InfoLinkProps {
  label: string;
}

const InfoLink = ({ label }: InfoLinkProps) => {
  return (
    <div className="w-44 flex justify-between items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#E63946"
          stroke-width="2"
          fill="none"
        />
        <circle cx="12" cy="8" r="1" fill="#E63946" />
        <line
          x1="12"
          y1="10"
          x2="12"
          y2="16"
          stroke="#E63946"
          stroke-width="2"
        />
      </svg>
      <p className="text-sm font-bold text-orange-600">{label}</p>
    </div>
  );
};

export default InfoLink;