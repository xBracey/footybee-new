interface IBox {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: IBox) => {
  return (
    <div
      className={`mx-auto w-full max-w-xl rounded-lg border border-gray-300 bg-white p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
