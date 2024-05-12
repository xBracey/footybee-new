const Logo = () => (
  <div className="flex flex-row items-center justify-center gap-1 md:flex-col">
    <img
      src="/logo.png"
      alt="logo"
      className="h-10 w-10 filter md:-mb-2 md:h-16 md:w-16"
      style={{
        filter:
          "invert(100%) sepia(0%) saturate(0%) hue-rotate(101deg) brightness(105%) contrast(102%)",
      }}
    />
    <p className="font-raleway font-bold">FootyBee</p>
  </div>
);

export default Logo;
