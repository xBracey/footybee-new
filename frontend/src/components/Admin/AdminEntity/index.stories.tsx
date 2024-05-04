import { Story } from "@ladle/react";
import AdminEntity from ".";

export const AdminEntityStory: Story = () => (
  <AdminEntity
    name="Fixtures"
    path="fixtures"
    entities={[
      {
        id: "1",
        name: "Fixture 1",
      },
      {
        id: "2",
        name: "Fixture 2",
      },
      {
        id: "3",
        name: "Fixture 3",
      },
      {
        id: "4",
        name: "Fixture 4",
      },
    ]}
    onDelete={(id) => console.log("Delete", id)}
  />
);

AdminEntityStory.storyName = "AdminEntity";
