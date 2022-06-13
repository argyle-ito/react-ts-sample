// 全ユーザーを一覧を取得するカスタムフック
import { useState } from "react";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";
export const UseAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const getUsers = () => {
    setLoading(true);
    seterror(false);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        seterror(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};
