import React, { useState, useEffect } from "react";
import { getUserByIdService,updateProfileService } from "../../services/api";

const Profile = () => {
  const userString = localStorage.getItem("user");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  let currentUserId = "";

  if (userString) {
    const user = JSON.parse(userString);
    currentUserId = user?.id;
  }


  const fetchUserData = async () => {
    try {
      const user = await getUserByIdService(currentUserId);
      setUserData(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async (id) => {
    setIsEditing(false);
    try {
      await updateProfileService(id,userData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  
  return (
    <div className="container mx-auto mt-10">
      {userData ? (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="text-center font-bold text-xl mb-4">My Profile</div>
            {isEditing ? (
            <>
              <div className="mb-4 flex">
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="first_name"
            type="text"
            name="first_name"
            value={userData?.first_name}
            onChange={handleInputChange}
          />
          </div>
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="last_name"
            type="text"
            name="last_name"
            value={userData?.last_name}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="mb-4 flex">
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          </div>
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="mb-4 flex">
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_joined">
            Date Joined
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date_joined"
            type="date_joined"
            name="date_joined"
            value={formatDate(userData.date_joined)}
            onChange={handleInputChange}
          />
          </div>
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="role"
            name="role"
            value={userData?.role}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={()=>handleSaveClick(userData.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
            </>
          ) : (
            <>
            <div className="mb-6 mt-6 flex justify-between">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <p className="text-gray-700 leading-tight">
                  {userData?.first_name}
                </p>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <p className="text-gray-700 leading-tight">
                  {userData?.last_name}
                </p>
              </div>
            </div>
            <div className="mb-6 mt-6 flex justify-between">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p className="text-gray-700 leading-tight">{userData?.email}</p>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <p className="text-gray-700 leading-tight">
                  {userData?.username}
                </p>
              </div>
            </div>
            <div className="mb-6 mt-6 flex justify-between">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date Joined
                </label>
                <p className="text-gray-700 leading-tight">
                  {userData?.date_joined
                    ? formatDate(userData.date_joined)
                    : "N/A"}
                </p>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <p className="text-gray-700 leading-tight">{userData?.role}</p>
              </div>
            </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={()=>handleEditClick()}
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              </div>
            </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;