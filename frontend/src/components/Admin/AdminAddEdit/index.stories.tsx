import { Story } from "@ladle/react";
import AdminAddEdit from ".";

export const AdminAddEditStory: Story = () => (
  <AdminAddEdit
    id={1}
    isLoading={false}
    entityIsDefined={true}
    title="Hello World"
  >
    Hello World
  </AdminAddEdit>
);

AdminAddEditStory.storyName = "AdminAddEdit";
