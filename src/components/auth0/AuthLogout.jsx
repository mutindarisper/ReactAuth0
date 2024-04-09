import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";
import React from "react";

const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};

export default AuthLogout;