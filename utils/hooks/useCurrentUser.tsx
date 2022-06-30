import { useSession } from "next-auth/react";

function useCurrentUser() {
  const { data: session } = useSession();

  const isCurrentUser = (userEmail: string) => {
    return userEmail === session?.user?.email;
  };

  return { session, isCurrentUser };
}

export default useCurrentUser;
