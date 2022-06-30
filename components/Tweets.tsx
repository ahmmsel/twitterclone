import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import TweetItem from "./TweetItem";

const Tweets = () => {
  const [tweets, setTweets] = useState<DocumentData>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "tweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setTweets(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  return (
    <div>
      {tweets.map((tweet: any) => (
        <TweetItem
          key={tweet.id}
          id={tweet.id}
          authorId={tweet.data().author.id}
          name={tweet.data().author.name}
          email={tweet.data().author.email}
          photoURL={tweet.data().author.photoURL}
          date={tweet.data().createdAt?.toDate()}
          text={tweet.data().text}
          picture={tweet.data().picture}
        />
      ))}
    </div>
  );
};

export default Tweets;
