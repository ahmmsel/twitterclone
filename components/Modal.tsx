import { ReactNode } from "react";
import { XIcon } from "@heroicons/react/solid";
import Backdrop from "./Backdrop";

interface IModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: IModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="primary-modal">
        <div className="relative h-full">
          <XIcon
            className="primary-icon absolute left-2 top-2"
            role="button"
            onClick={onClose}
          />
          <div className="p-4 pt-14">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
