import { useQuery } from "react-query";

export type User = {
  id: number;
  name: string;
};

export const getUsers = async () => {
  const res = await fetch("http://localhost:8080/users");

  return res.json() as Promise<User[]>;
};

export const useGetUsers = () => {
  const { data } = useQuery("users", getUsers);

  return data;
};
