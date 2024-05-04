import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8">
      <SyncLoader color="#fff" size={25} margin={4} />
    </div>
  );
};

export default Loading;
