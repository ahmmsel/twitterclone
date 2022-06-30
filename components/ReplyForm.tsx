import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import moment from "moment";
import { useSession } from "next-auth/react";
import React from "react";
import { db } from "../firebase";
import useForm from "../utils/hooks/useForm";
import Modal from "./Modal";

interface IReplyFormProps {
  onClose: () => void;
  id: string;
  name: string;
  photoURL: string;
  date: string;
  text: string;
}

const ReplyForm = ({
  onClose,
  id,
  name,
  photoURL,
  date,
  text,
}: IReplyFormProps) => {
  const { data: session }: { data?: any } = useSession();

  const { values, handleChange, handleReset, handleSubmit } = useForm({
    text: "",
  });

  const submitCallback = async () => {
    if (session) {
      if (values.text.trim()) {
        await addDoc(collection(db, "tweets", id, "replies"), {
          author: {
            name: session?.user?.name,
            email: session?.user?.email,
            photoURL: session?.user?.image,
          },
          text: values.text,
          createdAt: serverTimestamp(),
        });
        handleReset()();
        onClose();
      } else {
        return;
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-between p-3 gap-8">
        <div className="flex flex-col space-x-3 gap-4">
          <div className="flex justify-between items-start gap-4">
            <img
              src={photoURL}
              alt={name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex-1">
              <div>
                <h1 className="text-lg font-bold">{name}</h1>
                {moment(date).fromNow()}
              </div>
            </div>
          </div>
          <p className="font-semibold leading-relaxed">{text}</p>
        </div>
        <form
          onSubmit={handleSubmit(submitCallback)}
          className="flex flex-col justify-between gap-6">
          <div className="flex justify-between items-center gap-3">
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <input
              type="text"
              value={values.text}
              name="text"
              onChange={handleChange()}
              placeholder="Tweet yout reply"
              className="flex-1 px-2 py-4 outline-none bg-transparent font-medium text-xl"
            />
          </div>
          <button type="submit" className="primary-btn rounded-full">
            reply
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReplyForm;
