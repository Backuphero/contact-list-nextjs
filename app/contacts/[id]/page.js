"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditButtons from "@/app/components/EditButtons";
import { ContactAPI } from "@/app/data/contactAPI";
import { ErrorState } from "@/app/components/Contact";

function ContactPage({ params }) {
  const router = useRouter();
  const id = Number(params.id);

  // Handle invalid ID
  if (isNaN(id)) {
    return <ErrorState 
      title="Invalid Contact ID" 
      message="The contact ID provided is not valid." 
    />;
  }

  const contact = ContactAPI.get(id);

  // Handle contact not found
  if (!contact) {
    return <ErrorState 
      title="Contact Not Found" 
      message={`Sorry, we could not find a contact with that ID: ${id}`} 
    />;
  }

  const handleDelete = () => {
    ContactAPI.remove(contact);
    router.push("/contacts");
  };

  return (
    <div className="container">
      <div className="content-container text-center">
        <h1>{contact.name}</h1>
        <Image
          src={contact.image_url}
          alt={`${contact.name}'s profile picture`}
          width={250}
          height={250}
          unoptimized
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/8847/8847419.png";
          }}
        />
        <div className="contact-details">
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone_number}</p>
        </div>
        <EditButtons contact={contact} onDelete={handleDelete} />
        <Link href="/contacts" className="block">
          Back to Contacts
        </Link>
      </div>
    </div>
  );
}

export default ContactPage;
