interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
