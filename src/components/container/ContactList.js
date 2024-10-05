"use client";
import ContactItem from "@/components/ContactItem";
import Link from "next/link";
import * as React from "react";

export default function ContactList() {
  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://contact-apps-api.ainunns.me/api/contacts`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNDE5NDA4LWRhMjQtNDMwZi04MDg0LTgxZWRmYTVlMDdkMSIsIm5hbWUiOiJOYXRoYW4gS2hvIFBhbmNyYXMiLCJlbWFpbCI6IjUwMjcyMzEwMDJAc3R1ZGVudC5pdHMuYWMuaWQiLCJpYXQiOjE3MjY4NTE2MTgsImV4cCI6MTcyOTQ0MzYxOH0.ODoQPyVHom6_Fb12E83XLNAberYPOqYXS_qUTs5Z1SU`,
          },
        }
      );
      const data = await response.json();
      setContacts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='font-semibold text-lg'>
        <h2 font-semibold text-lg>Contact List</h2>
        {contacts.map((contact) => (
          <Link key={contact.id} href={`/contacts/${contact.id}`} passHref>
            <ContactItem
              id={contact.id}
              name={contact.name}
              email={contact.email}
              imgUrl={contact.img_url}
              onDelete={handleDelete}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
