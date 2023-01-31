import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import '../index.css'

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user) setUser(user);
    setLoading(false);
  };

  const signOut = async () => await Auth.signOut();

  const privateRequest = async () => {
    try {
      const response = await API.get("api", "/private", {
        headers: {
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      });
      alert(JSON.stringify(response));
    } catch (error) {
      alert(error);
    }
  };
  const publicRequest = async () => {
    const response = await API.get("api", "/public");
    alert(JSON.stringify(response));
  };


  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="profile">
        <p>Welcome {user.attributes.name}!</p>
        <img
          src={user.attributes.picture}
          style={{ borderRadius: "50%" }}
          width={100}
          height={100}
          alt=""
        />
        <p>{user.attributes.email}</p>
        <button onClick={signOut}>logout</button>
      </div>
      <div className="api-section">
        <button onClick={privateRequest}>call /private</button>
      </div>
      <div className="api-section">
        <button onClick={publicRequest}>call /public</button>
      </div>
    </div>
  );
};

export default ProfilePage;
