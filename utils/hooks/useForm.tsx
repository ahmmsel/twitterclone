import { ChangeEvent, useState } from "react";
import { FILES, RESET_ALL, TEXT } from "../../constant/variables";

function useForm(initialState: any) {
  const [values, setValues] = useState(initialState);

  const handleChange = (type = TEXT) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = event.target;

      if (type === FILES && files) {
        const reader = new FileReader();
        if (files[0]) {
          reader.readAsDataURL(files[0]);
        }

        reader.onload = (readerEvent) => {
          setValues((prevValues: any) => ({
            ...prevValues,
            [name]: readerEvent?.target?.result,
          }));
        };
      } else {
        setValues((prevValues: any) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    };
  };

  const handleReset = (value = RESET_ALL) => {
    return () => {
      if (value === RESET_ALL) {
        setValues(initialState);
      } else {
        setValues((prevValues: any) => ({
          ...prevValues,
          [value]: "",
        }));
      }
    };
  };

  const handleSubmit = (callback: () => void) => {
    return (event: { preventDefault: () => void }) => {
      event.preventDefault();
      callback();
    };
  };

  return { values, handleChange, handleReset, handleSubmit };
}

export default useForm;
