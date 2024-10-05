import ContactInput from "@/components/container/ContactInput";
import ContactList from "@/components/container/ContactList";

export default function Home() {
  return (
    <>
      <div className="w-[60%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="font-semibold text-[42px] mb-6 text-center text-gray-800">
          Contact Apps
        </h1>
        <h2 className='font-semibold text-lg'>Add New Contact</h2>
        <ContactInput />
        <ContactList />
      </div>
    </>
  );
}
