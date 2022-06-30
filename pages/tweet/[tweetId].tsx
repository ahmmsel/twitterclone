import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import Replies from "../../components/Replies";
import TweetItem from "../../components/TweetItem";
import { db } from "../../firebase";

interface ITweetProps {
  tweet: string;
}

const Tweet = ({ tweet }: ITweetProps) => {
  const tweetData = JSON.parse(tweet);

  return (
    <>
      <Head>
        <title>{tweetData?.author?.name} | Twitter</title>
        <meta name="description" content={tweetData?.text} />
      </Head>
      <TweetItem
        authorId={tweetData?.author?.id}
        id={tweetData?.id}
        name={tweetData?.author?.name}
        email={tweetData?.author?.email}
        photoURL={tweetData?.author?.photoURL}
        date={tweetData?.createdAt}
        text={tweetData?.text}
        picture={tweetData?.picture}
      />
      <Replies id={tweetData?.id} />
    </>
  );
};

export default Tweet;

export async function getServerSideProps(context: {
  query: { tweetId: string };
}) {
  const tweetRef = doc(db, "tweets", context.query.tweetId);

  const tweet = await getDoc(tweetRef);

  const tweetData = {
    ...tweet.data(),
    id: tweet.id,
    createdAt: new Date(tweet.data()?.createdAt.toDate()),
  };

  return {
    props: {
      tweet: JSON.stringify(tweetData),
    },
  };
}
