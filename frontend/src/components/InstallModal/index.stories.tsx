import { Story } from "@ladle/react";
import InstallModal from ".";

export const InstallModalStory: Story = () => (
  <InstallModal open={true} setOpen={() => {}} />
);

InstallModalStory.storyName = "InstallModal";
