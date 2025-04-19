"use client";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import { ContactAPI } from "@/app/data/contactAPI";

function NewContact() {
  return (
    <div className="content-container">
      <h1>Add Contact</h1>
      <ContactForm />
      <Link href="/">Home</Link>
    </div>
  );
}

export default NewContact;
