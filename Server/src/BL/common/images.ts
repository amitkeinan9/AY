import fs from "fs/promises";
import path from "path";

export enum ImageType {
  POST = "posts",
  PROFILE = "profiles",
}

/**
 * Parses an image and stores in under the public folder
 * @param base64Data image data, format: data:image/FORMAT;base64,DATA
 * @param fileName image file name with no extension
 * @param type if the image is a profile image or from a post
 *
 * @returns The public URL for the image
 */
export const saveImage = async (
  base64Data: string,
  fileName: string,
  type: ImageType
): Promise<string> => {
  const imageData: string = base64Data.split(",")[1];
  const imageFormat: string = base64Data.split(";")[0].split("/")[1];

  const fullFileName = `${fileName}-${new Date().getTime()}.${imageFormat}`;

  await fs.writeFile(
    path.resolve("public", "images", type, fullFileName),
    imageData,
    { encoding: "base64" }
  );

  return `${process.env.SERVER_URL}/public/images/${type}/${fullFileName}`;
};
