import React from "react";

interface IBackdropProps {
  onClose: () => void;
}

const Backdrop = ({ onClose }: IBackdropProps) => {
  return (
    <div
      className="fixed inset-0 overflow-y-auto z-[60] bg-black bg-opacity-60"
      onClick={onClose}></div>
  );
};

export default Backdrop;
