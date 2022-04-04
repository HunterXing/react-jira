import { useHttp } from "api/api";
import { useQuery } from "react-query";
import { User } from "screens/project-list/List";

export const useUsers = () => {
  const client = useHttp();
  return useQuery<User[]>("users", () =>
    client("users", {
      method: "GET",
    })
  );
};
