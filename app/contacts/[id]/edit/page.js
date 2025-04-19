"use client";
import ContactForm from "@/app/components/ContactForm";
import Link from "next/link";
import { ContactAPI } from "@/app/data/contactAPI";
import { ErrorState } from "@/app/components/Contact";

function EditContact({ params }) {
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

  return (
    <div className="container">
      <h1>Edit Contact</h1>
      <ContactForm contact={contact} />
      <Link href="/contacts" className="block">
        Back to Contacts
      </Link>
    </div>
  );
}

export default EditContact;
