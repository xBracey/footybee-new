import { Loader } from "@mantine/core";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8">
      <Loader color="white" size="lg" />
    </div>
  );
};

export default Loading;
