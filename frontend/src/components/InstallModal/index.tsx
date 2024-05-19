import { Modal } from "@mantine/core";
import { Share } from "../Icons/Icons";
import { useWindowSize } from "usehooks-ts";
import { useMemo } from "react";

interface IInstallModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InstallModal = ({ open, setOpen }: IInstallModal) => {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < 768, [width]);

  if (!isMobile) return null;

  return (
    <div className="block md:hidden">
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center ">
          <img
            src="/logo.png"
            alt="Install"
            className="h-12 w-12"
            style={{
              filter:
                "invert(26%) sepia(33%) saturate(917%) hue-rotate(110deg) brightness(96%) contrast(97%)",
            }}
          />
          <h2 className="text-3xl font-bold text-gray-700">Install App</h2>
          <p className="mx-8 text-lg text-gray-500">
            Install this application on your home screen to get started.
          </p>

          <p className="text-shamrock-900 -mx-1 mt-4 text-sm">
            Just tap <Share className="inline h-6 w-6" /> then Add to Home
            Screen to install.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default InstallModal;
