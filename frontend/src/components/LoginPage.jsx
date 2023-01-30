import React from "react";
import { Auth } from "aws-amplify";
import '../index.css'

const LoginPage = () => {
  const signIn = async () =>
    await Auth.federatedSignIn({
      provider: "GitHub",
    });

  return (
    <div className="login">
      <p>Not signed in</p>
      <button onClick={signIn}>login</button>
    </div>
  );
};

export default LoginPage;