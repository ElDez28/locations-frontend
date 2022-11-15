import { useEffect, useState, useCallback } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/UIElements/UIElements/ErrorModal";
import { useHttp } from "../pages/httpFn";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getData = (async () => {
      try {
        const { data } = await sendRequest(
          "http://127.0.0.1:5000/api/v1/users"
        );
        setUsers(data);
      } catch (err) {}
    })();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {!error && <UsersList isLoading={isLoading} items={users}></UsersList>}
    </>
  );
};

export default Users;
