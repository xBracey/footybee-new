interface IBanner {
  children: React.ReactNode;
  className?: string;
}

const Banner = ({ children, className = "bg-pine-green-800 p-6" }: IBanner) => {
  return (
    <div
      className={`-m-2 mb-0 flex w-[calc(100%+1rem)] flex-col items-center justify-center md:-m-4 md:mb-0 md:w-[calc(100%+2rem)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Banner;
