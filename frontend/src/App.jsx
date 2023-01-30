
import React, { useState, useEffect } from "react";
import LoginPage from "../src/components/LoginPage";
import ProfilePage from "../src/components/ProfilePage";
import { Auth } from "aws-amplify";
import './index.css'

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const user = await Auth.currentUserInfo()
    if (user) setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return user ? (
    <ProfilePage user={user} setUser={setUser} />
  ) : (
    <LoginPage setUser={setUser} />
  );
};

export default App;