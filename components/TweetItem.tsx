import {
  DotsHorizontalIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIcoFill } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useLocalModal from "../utils/hooks/useLocalModal";
import ReplyForm from "./ReplyForm";
import TweetButton from "./TweetButton";

interface Props {
  authorId: string;
  id: string;
  name: string;
  email: string;
  photoURL: string;
  date: string;
  text: string;
  picture: string;
}

const TweetItem = ({
  authorId,
  id,
  name,
  email,
  photoURL,
  date,
  text,
  picture,
}: Props) => {
  const { data: session }: { data: any } = useSession();

  const { isOpen, handleToggleModal } = useLocalModal();

  const [totalComments, setTotalComments] = useState<number>(0);
  const [likes, setLikes] = useState<DocumentData>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/tweet/${id}`);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", id, "replies"),
      (snapshot) => {
        setTotalComments(snapshot.docs.length);
      }
    );

    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const likedTweet = likes.find(
      (like: { id: string }) => like.id === session?.user?.id
    );
    if (likedTweet) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes]);

  const handleTweetLike = async () => {
    if (isLiked) {
      await deleteDoc(doc(db, "tweets", id, "likes", session?.user?.id));
    } else {
      await setDoc(doc(db, "tweets", id, "likes", session?.user?.id), {
        username: session?.user?.username,
      });
    }
  };

  return (
    <>
      {isOpen && (
        <ReplyForm
          onClose={handleToggleModal}
          id={id}
          name={name}
          photoURL={photoURL}
          date={date}
          text={text}
        />
      )}
      <article className="border-b border-color transition-all duration-200 hover:bg-neutral-100">
        <div className="flex flex-col space-x-3 p-3 gap-4">
          <div className="flex justify-between items-start gap-4">
            <img
              src={photoURL}
              alt={name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex-1">
              <div>
                <h1 className="text-lg font-bold">{name}</h1>
                <small className="text-gray-600 font-medium">
                  {moment(date).fromNow()}
                </small>
              </div>
            </div>
            <DotsHorizontalIcon
              className="secondary-icon hover:bg-gray-200"
              role="button"
            />
          </div>
          <p
            className="font-semibold leading-relaxed"
            role="button"
            onClick={handleNavigate}>
            {text}
          </p>
          {picture && (
            <img
              src={picture}
              alt={text}
              className="m-0 sm:w-3/4 md:w-2/4 rounded-3xl"
            />
          )}
          <div className="flex justify-between items-center">
            <TweetButton
              Icon={ChatIcon}
              bg="group-hover:bg-blue-100"
              color="hover:text-blue-400"
              id={id}
              count={totalComments}
              onClick={handleToggleModal}
            />
            <TweetButton
              Icon={ShareIcon}
              bg="group-hover:bg-green-100"
              color="hover:text-green-400"
              id={id}
              count={0}
            />
            <TweetButton
              Icon={isLiked ? HeartIcoFill : HeartIcon}
              bg="group-hover:bg-red-100"
              color={isLiked ? "text-red-400" : "hover:text-red-400"}
              id={id}
              count={likes.length}
              onClick={handleTweetLike}
            />
            <TweetButton
              Icon={UploadIcon}
              bg="group-hover:bg-blue-100"
              color="hover:text-blue-400"
              id={id}
              count={0}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default TweetItem;
