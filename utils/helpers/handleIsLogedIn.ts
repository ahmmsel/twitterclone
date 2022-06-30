import { Session } from "next-auth";
import { signIn } from "next-auth/react";

function handleIsLogedIn(session?: any, callback = () => {}) {
  return () => {
    if (!session) {
      signIn();
    } else {
      return callback();
    }
  };
}

export default handleIsLogedIn;
