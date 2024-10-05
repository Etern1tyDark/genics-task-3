import Image from "next/image";
import { useState } from "react";

export default function ContactItem({
  id,
  imgUrl = "../public/images/placeholder.png",
  name,
  email,
  onDelete,
}) {
  const [loading, setLoading] = useState(false);

  const validImgUrl =
    imgUrl && (imgUrl.startsWith("http") || imgUrl.startsWith("/"))
      ? imgUrl
      : "/images/placeholder.png";

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://contact-apps-api.ainunns.me/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNDE5NDA4LWRhMjQtNDMwZi04MDg0LTgxZWRmYTVlMDdkMSIsIm5hbWUiOiJOYXRoYW4gS2hvIFBhbmNyYXMiLCJlbWFpbCI6IjUwMjcyMzEwMDJAc3R1ZGVudC5pdHMuYWMuaWQiLCJpYXQiOjE3MjY4NTE2MTgsImV4cCI6MTcyOTQ0MzYxOH0.ODoQPyVHom6_Fb12E83XLNAberYPOqYXS_qUTs5Z1SU`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Error deleting contact:", data);
        throw new Error("Failed to delete contact");
      }

      console.log("Contact deleted:", id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center my-4 p-4 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-3px]">
        <div className="contact_image">
          <Image
            src={validImgUrl}
            width={128}
            height={128}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <p className="font-medium text-lg mb-1">{name}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        <button
          className="px-3 py-2 text-base bg-red-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-600"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "..." : "X"}
        </button>
      </div>
    </>
  );
}
