"use client";
import * as React from "react";
import Input from "../form/Input";

export default function ContactInput() {
  const formRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    const form = formRef.current;

    e.preventDefault();

    const contactData = {
      name: form["name"].value.trim(),
      email: form["email"].value.trim(),
      img_url:
        form["img_url"].value || "https://dummyjson.com/icon/michaels/70",
    };

    console.log("Submitting data:", contactData);
    setLoading(true);

    try {
      const response = await fetch(
        `https://contact-apps-api.ainunns.me/api/contacts/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNDE5NDA4LWRhMjQtNDMwZi04MDg0LTgxZWRmYTVlMDdkMSIsIm5hbWUiOiJOYXRoYW4gS2hvIFBhbmNyYXMiLCJlbWFpbCI6IjUwMjcyMzEwMDJAc3R1ZGVudC5pdHMuYWMuaWQiLCJpYXQiOjE3MjY4NTE2MTgsImV4cCI6MTcyOTQ0MzYxOH0.ODoQPyVHom6_Fb12E83XLNAberYPOqYXS_qUTs5Z1SU`,
          },
          body: JSON.stringify(contactData),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        console.error("Error details:", data);
        throw new Error("Failed to submit contact");
      }

      console.log("Contact submitted:", data);

      form.reset();
    } catch (error) {
      console.error("Error submitting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-md mb-8">
        <form className="contact_form" ref={formRef}>
          <Input placeholder="Name" name="name" />
          <Input placeholder="Email" name="email" />
          <Input placeholder="Image URL" name="img_url" />
          <button
            className="w-full p-3 font-sans text-lg bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}
