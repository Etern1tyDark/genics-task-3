import { useRouter } from "next/router";
import * as React from "react";
import Image from "next/image";
import "../../app/globals.css";

export default function ContactDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await fetch(
            `https://contact-apps-api.ainunns.me/api/contacts/${id}`,
            {
              headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNDE5NDA4LWRhMjQtNDMwZi04MDg0LTgxZWRmYTVlMDdkMSIsIm5hbWUiOiJOYXRoYW4gS2hvIFBhbmNyYXMiLCJlbWFpbCI6IjUwMjcyMzEwMDJAc3R1ZGVudC5pdHMuYWMuaWQiLCJpYXQiOjE3MjY4NTE2MTgsImV4cCI6MTcyOTQ0MzYxOH0.ODoQPyVHom6_Fb12E83XLNAberYPOqYXS_qUTs5Z1SU`,
              },
            }
          );
          const data = await response.json();
          setContact(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchContact();
    }
  }, [id]);

  if (loading) {
    return <p>Loading contact details...</p>;
  }

  if (!contact) {
    return <p>No contact found.</p>;
  }

  return (
    <>
      <div className="w-screen bg-black m-0 flex justify-center items-center h-screen p-5">
        <div className="w-fit mx-auto bg-white shadow-md rounded-lg overflow-hidden font-sans px-20 py-10 flex flex-col justify-center items-center">
          <div className="flex items-center space-x-4">
            <Image
              src={contact.img_url}
              alt={contact.name}
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
            <p className="text-gray-600">{contact.email}</p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Send Message
            </button>
            <button
              className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-600"
              onClick={() => router.push("/")}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
