const Logo = () => (
  <div className="flex flex-col items-center">
    <img
      src="/logo.png"
      alt="logo"
      className="-mb-2 h-16 w-16 filter"
      style={{
        filter:
          "invert(100%) sepia(0%) saturate(0%) hue-rotate(101deg) brightness(105%) contrast(102%)",
      }}
    />
    <p className="font-raleway font-bold">FootyBee</p>
  </div>
);

export default Logo;
