import Image from "next/image";
import toast from "react-hot-toast";
interface EditImageProps {
  link: string;
  setLink: (link: string) => void;
}

const EditImage: React.FC<EditImageProps> = ({ link, setLink }) => {
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("files", files[0]);
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });
      toast.promise(uploadPromise, {
        loading: "Saving...",
        success: "Upload complete!",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-2"
          src={link}
          width={96}
          height={96}
          alt="avatar"
        />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span
          onClick={() => {}}
          className="block border rounded-lg p-2 text-center border-gray-300 cursor-pointer"
        >
          Edit
        </span>
      </label>
    </>
  );
};
export default EditImage;
