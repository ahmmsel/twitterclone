import { RefreshIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import Searchbar from "./Searchbar";
import TweetForm from "./TweetForm";
import Tweets from "./Tweets";

const Feed = () => {
  const { data: session } = useSession();
  return (
    <section>
      {session && <TweetForm />}
      <Tweets />
    </section>
  );
};

export default Feed;
