import axios from "axios";

const upload = async (file) => {
  const urls = [];
  const length = file.length;

  const data = new FormData();

  for (var i = 0; i < length; i++) {
    data.append("file", file[i]);
    data.append("upload_preset", "urban_shoes");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/additya/upload",
        data
      );

      const { url } = res.data;
      urls.push(url);
    } catch (err) {
      console.log(`Error in upload: ${err}`);
      return;
    }
  }

  return urls;
};

export default upload;
