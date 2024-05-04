const buttonTypeToColour = {
  primary: "bg-blue-500 hover:bg-blue-700",
  secondary: "bg-gray-500 hover:bg-gray-700",
  danger: "bg-red-500 hover:bg-red-700",
};

export const Button = ({
  children,
  onClick,
  className,
  buttonType = "primary",
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  buttonType?: "primary" | "secondary" | "danger";
}) => {
  const colourClasses = buttonTypeToColour[buttonType];

  return (
    <button
      className={`rounded py-2 px-4 font-bold text-white transition-all hover:scale-105 ${colourClasses} ${className}`}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </button>
  );
};
