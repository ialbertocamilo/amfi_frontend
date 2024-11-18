type StarRatingProps = {
  label:string;
  value: number;
  max: number;
  onChange: (value: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ label,value, max, onChange }) => {
  return (
  <div className="flex justify-between items-center gap-4">
      <div className="text-sm font-medium text-gray-800 leading-tight w-40 truncate">
        {label}
      </div>
      <div className="flex space-x-1 pr-20">
        {Array.from({ length: max }).map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-7 w-7 cursor-pointer ${index < value ? 'text-yellow-400' : 'text-gray-300'
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => onChange(index + 1)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.668 5.13h5.386c.97 0 1.371 1.24.588 1.81l-4.346 3.073 1.668 5.131c.3.922-.755 1.688-1.538 1.118L10 15.347l-4.346 3.073c-.783.57-1.838-.196-1.538-1.118l1.668-5.131-4.346-3.073c-.783-.57-.382-1.81.588-1.81h5.386l1.668-5.13z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
