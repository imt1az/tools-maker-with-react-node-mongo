import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import UserRow from "./UserRow";
// import UserRow from "./UserRow";

const Users = () => {

    const {
        data: users,
        isLoading,
        refetch,
      } = useQuery("users", () =>
        fetch("http://localhost:5000/users",{
          method:'GET',
          headers:{
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
          }
        }).then((res) => res.json())
      );
      if (isLoading) {
        return <Loading></Loading>;
      }

    return (
        <div>
            <div>
      <h1 className="text-2xl font-semibold mt-4 bg-gray-800 rounded-2xl text-white p-4 text-center">
        Total Users : {users.length}{" "}
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full my-5">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Admin</th>
              <th>Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map(user=><UserRow
                key={user._id}
                user = {user}
                refetch ={refetch}
                >

                </UserRow>)
            }

            
          </tbody>
        </table>
      </div>
    </div>
        </div>
    );
};

export default Users;