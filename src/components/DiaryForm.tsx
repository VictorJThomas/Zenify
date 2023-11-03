import { FormEvent ,useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";


function DiaryForm() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (result: any) => {
    axios.post('/api/diary', {
      image: result.info.secure_url,
    })    
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if(file){
    formData.append("image", file)
    formData.app;
    }
    console.log(file)
    console.log(content)
    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        body: formData,
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-zinc-950 p-5">
        <input
          type="text"
          placeholder="Content"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
          value={content}          
          onChange={(e) => setContent(e.target.value)}
        />
        <h1 className="text-4xl text-center my-4">Upload image</h1>
        <input
          type="file"
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
        >
          Submit diary
        </button>
      </form>
    </div>
  );
}
export default DiaryForm;
