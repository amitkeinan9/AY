import { useCallback, useEffect, useState } from "react";

export const useSelectImage = (defaultImage?: string) => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const resetImage = useCallback(async () => {
    if (defaultImage) {
      const res: Response = await fetch(defaultImage);
      const blob: Blob = await res.blob();
      const file: File = new File([blob], "default.png", blob);
      setSelectedImage(file);
    } else {
      removeImage();
    }
  }, [defaultImage]);

  useEffect(() => {
    resetImage();
  }, [resetImage]);

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.toString());
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = () => {
    setSelectedImage(undefined);
    setPreview(undefined);
  };

  return {
    selectedImage: selectedImage ? readFileAsBase64(selectedImage) : undefined,
    preview,
    resetImage,
    selectImage,
    removeImage,
  };
};
