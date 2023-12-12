import React, { useEffect, useState } from "react";
import { addUserService, getAllUsers, deleteUserService, editUserService } from "../../services/api";
import { toast } from "react-toastify"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UserModal from "../modals/userModal"

const Users = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const [userList, setUserList] = useState([]);
  const [userModal, setUserModal] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    date_joined: "",
    role: "manager"
  })
  const [editId, setEditId] = useState("")

  useEffect(() => {
    getUserApiCall();
  }, []);

  const getUserApiCall = async () => {
    try {
      const data = await getAllUsers();
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderUsersByRole = (role) => {
    const filteredUsers = userList?.filter((user) => user.role === role);

    if (!filteredUsers || filteredUsers.length <= 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user?.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">{user?.username}</h2>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <p className="text-gray-600 mb-1">First Name - {user?.first_name}</p>
            <p className="text-gray-600 mb-1">Last Name - {user?.first_name}</p>
            <p className="text-gray-500 font-bold">Role - {user?.role}</p>
            <br />
            {userData.id !== user.id && userData.role !== "manager" && (
              <button onClick={() => handleDeleteUser(user.id)}>
                <MdDelete size={24} />
              </button>
            )}
            {userData.id !== user.id && (
              <button className="ml-4" onClick={() => {
                setUser({
                  username: user.username,
                  password: user.password,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  date_joined: user.date_joined,
                  role: user.role
                })
                setUserModal(true)
                setEditId(user.id)
              }}>
                <FaEdit size={22} />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleAddUser = async () => {
    const { username, password, date_joined } = user
    if (!username || !password || !date_joined) {
      toast.error("Please fill all the required fields.")
      return
    }
    try {
      const data = await addUserService(user);
      if (data) {
        setUserModal(false)
        setUser({})
        toast.success("User is added")
        getUserApiCall()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditUser = async () => {
    const { username, date_joined } = user
    if (!username || !date_joined) {
      toast.error("Please fill all the required fields.")
      return
    }
    try {
      const data = await editUserService(user, editId);
      if (data) {
        setUserModal(false)
        setUser({})
        setEditId("")
        toast.success("User is updated")
        getUserApiCall()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserService(id);
      toast.success("User is deleted")
      getUserApiCall()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mx-auto mt-10">
        <button style={{
          backgroundColor: "deepskyblue",
          padding: "10px",
          borderRadius: "10px",
          color: "white",
          marginBottom: "10px"
        }} onClick={() => setUserModal(true)}>Add User</button>
        <hr />
        <section className="mt-4">
          {renderUsersByRole("operator") && (
            <>
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">Operators</h1>
              {renderUsersByRole("operator")}
            </>
          )}
        </section>

        <section className="mt-6">
          {renderUsersByRole("manager") && (
            <>
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">Managers</h1>
              {renderUsersByRole("manager")}
            </>
          )}
        </section>

        <section className="mt-6">
          {renderUsersByRole("engineer") && (
            <>
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">Engineers</h1>
              {renderUsersByRole("engineer")}
            </>
          )}
        </section>

        <section className="mt-6">
          {renderUsersByRole("owner") && (
            <>
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">Owners</h1>
              {renderUsersByRole("owner")}
            </>
          )}
        </section><br />
      </div>
      {userModal && (
        <UserModal
          editId={editId}
          setEditId={setEditId}
          setUserModal={setUserModal}
          setUser={setUser}
          user={user}
          handleEditUser={handleEditUser}
          handleAddUser={handleAddUser}
        />
      )}
    </>
  );
};

export default Users;
