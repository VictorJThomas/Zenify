import { useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";


function DiaryForm() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [content, setContent] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (result: any) => {
    const cloudinaryUrl = result.info.secure_url;

    setContent(content + `\n![Image](${cloudinaryUrl})`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    try {
      const res = await axios.post("/api/diary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.data();
      setImageUrl(data.url);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-zinc-950 p-5">
        <textarea
          name="content"
          placeholder="Content"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <h1 className="text-4xl text-center my-4">Upload image</h1>
        <input
          type="file"
          name="file"
          className="bg-zinc-900 text-zinc-100 p-2 rounded block m-2"
          onChange={handleFileChange}
        />
        <CldUploadButton
            options={{ maxFiles: 1 }} 
            onUpload={handleUpload} 
            uploadPreset="pgc9ehd5"
        >
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <button
          className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
          disabled={!content}
          type="submit"
        >
          Submit diary
        </button>
      </form>
    </div>
  );
}
export default DiaryForm;
