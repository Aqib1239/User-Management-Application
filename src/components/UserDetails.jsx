import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../services/userService";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUsers(id);
      setUser(response);
    };
    fetchUser();
  }, [id]);

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {user.address?.street}
          </p>
          <p className="mb-2">
            <strong>Company:</strong> {user.company?.name || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Website:</strong> {user.website || "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default UserDetails;
