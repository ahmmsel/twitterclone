import { useEffect, useState } from "react";

function useLocalModal() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return { isOpen, handleToggleModal };
}

export default useLocalModal;
