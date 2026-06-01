import { Button, LoadingOverlay, Switch, TextInput } from "@mantine/core";
import { useGetUser } from "../../../queries/useGetUser";
import { usePostUser } from "../../../queries/usePostUser";
import AdminAddEdit from "../AdminAddEdit";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface IUserAdmin {
  username?: string;
}

const UserAdmin = ({ username }: IUserAdmin) => {
  const { data: user, isLoading } = useGetUser(username);
  const { postUser, isLoading: isPosting } = usePostUser(username);

  const form = useForm<{ admin: boolean; newPassword: string }>({
    mode: "controlled",
    initialValues: {
      admin: false,
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({ admin: user.admin });
    }
  }, [user]);

  return (
    <AdminAddEdit
      id={username}
      isLoading={isLoading}
      entityIsDefined={!!user}
      title={`User - ${username}`}
    >
      <LoadingOverlay visible={isPosting || isLoading} />
      <form
        onSubmit={form.onSubmit((values) => {
          postUser({
            isAdmin: values.admin,
            newPassword: values.newPassword || undefined,
          });
        })}
        className="flex flex-col gap-4"
      >
        <Switch
          label="Admin"
          {...form.getInputProps("admin")}
          checked={form.values?.admin}
        />

        <TextInput
          type="password"
          label="New Password (leave blank to keep current)"
          {...form.getInputProps("newPassword")}
        />

        <Button type="submit">Save</Button>
      </form>
    </AdminAddEdit>
  );
};

export default UserAdmin;
