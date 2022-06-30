import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import moment from "moment";
import { useState, useEffect } from "react";
import { db } from "../firebase";

interface IRepliesProps {
  id: string;
}

const Replies = ({ id }: IRepliesProps) => {
  const [replies, setReplies] = useState<DocumentData>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "tweets", id, "replies"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        setReplies(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-6">
        {replies.map((reply: DocumentData) => (
          <div className="border-b border-color" key={reply.id}>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex justify-start items-start gap-4 ">
                <img
                  src={reply?.data()?.author.photoURL}
                  alt={reply?.data()?.author.name}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h1 className="text-lg font-bold">
                    {reply?.data()?.author?.name}
                  </h1>
                  <small className="text-gray-600 font-medium">
                    {moment(reply?.data()?.createdAt?.toDate()).fromNow()}
                  </small>
                </div>
              </div>
              <p className="font-semibold">{reply?.data()?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Replies;
