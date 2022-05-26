import React from "react";
import { toast } from "react-toastify";

const UserRow = ({ user, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed To Make Admin", { toastId: "random" });
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Successfully Add a Admin", { toastId: "random" });
        }
      });
  };

  return (
    <tr className="font-semibold">
      <th>#</th>
      <td>{email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-sm">
            Make Admin
          </button>
        )}
      </td>
      <td>
        <button className="btn btn-sm">Remove User</button>
      </td>
    </tr>
  );
};

export default UserRow;
