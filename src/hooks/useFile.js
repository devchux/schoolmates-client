import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";

export const useFile = (extras = [], removeFileTypeValidation = false) => {
  const [base64String, setBase64String] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const {
    apiServices: { convertBase64 },
  } = useAppContext();
  const fileRef = useRef();

  const reset = () => {
    setFileName("");
    setFilePreview(null);
    setBase64String("");
    fileRef.current.value = "";
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const file_types = ["image/png", "image/jpeg", "image/jpg", ...extras];

    if (!file) return;

    if (!file_types.includes(file.type) && !removeFileTypeValidation) {
      reset();
      toast.error(`File can either be ${file_types.join(", ")}`);
      return;
    }

    if (file.size > 3000000) {
      reset();
      toast.error("File should not be greater than 3mb");
      return;
    }

    setFileName(file.name);
    setFilePreview(URL.createObjectURL(file));
    const photoData = await convertBase64(file);
    setBase64String(photoData);
  };

  return {
    base64String,
    fileName,
    filePreview,
    handleImageChange,
    reset,
    fileRef,
  };
};
