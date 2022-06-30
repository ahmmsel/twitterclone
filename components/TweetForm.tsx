import {
  PhotographIcon,
  EmojiHappyIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FILES } from "../constant/variables";
import { db, storage } from "../firebase";
import useForm from "../utils/hooks/useForm";

const TweetForm = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const { values, handleChange, handleReset, handleSubmit } = useForm({
    text: "",
    picture: "",
  });

  const submitCallback = async () => {
    setLoading(true);
    if (session) {
      const postRef = await addDoc(collection(db, "tweets"), {
        author: {
          name: session?.user?.name,
          email: session?.user?.email,
          photoURL: session?.user?.image,
        },
        text: values.text,
        createdAt: serverTimestamp(),
      });

      if (values.picture) {
        const imageRef = ref(storage, `posts/${postRef.id}/image`);
        await uploadString(imageRef, values.picture, "data_url").then(
          async (snaphot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "tweets", postRef.id), {
              picture: downloadUrl,
            });
          }
        );
      }
      handleReset()();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitCallback)} className="relative">
      <div className="py-4 flex flex-col gap-4 border-b border-color p-3">
        <div className="flex justify-between items-start">
          <img
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              value={values.text}
              name="text"
              onChange={handleChange()}
              placeholder="What's happening?"
              className="outline-none w-full px-2 py-4 bg-transparent"
            />
          </div>
        </div>
        {values.picture && (
          <img
            src={values.picture}
            alt={values.text}
            className="w-full sm:3/4 md:w-2/4 rounded-3xl"
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <label>
              <PhotographIcon className="w-6 h-6 text-blue-400" role="button" />
              <input
                type="file"
                name="picture"
                onChange={handleChange(FILES)}
                className="hidden"
              />
            </label>
            <EmojiHappyIcon className="w-6 h-6 text-blue-400" role="button" />
          </div>
          <button
            className="primary-btn rounded-full disabled:opacity-50"
            type="submit"
            disabled={!values.text || loading}>
            {loading ? "uploading..." : "tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
