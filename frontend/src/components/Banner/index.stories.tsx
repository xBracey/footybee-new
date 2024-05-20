import { Story } from "@ladle/react";
import Banner from ".";

export const BannerStory: Story = () => (
  <Banner className="bg-pine-green-800">
    <h1>Hello World</h1>
  </Banner>
);

BannerStory.storyName = "Banner";
