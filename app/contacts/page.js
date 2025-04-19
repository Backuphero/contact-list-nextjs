"use client";
import Link from "next/link";
import Contact from "../components/Contact";
import { ContactAPI } from "../data/contactAPI";
import { useState } from "react";
import Search from "../components/Search";

function ContactsPage() {
  const [contacts, setContacts] = useState(ContactAPI.contacts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = ContactAPI.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
    setContacts(filtered);
  };

  const handleDelete = (contact) => {
    const updatedContacts = ContactAPI.remove(contact);
    setContacts(updatedContacts);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Contacts</h1>
        <Link href="/contacts/new" className="primary-button">
          Add New Contact
        </Link>
      </div>

      <div className="search-section">
        <Search 
          onSearchTermChange={handleSearch}
          initialValue={searchTerm}
        />
        <p className="results-count">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {contacts.length > 0 ? (
        <div className="contacts-list">
          <div className="list-header grid-headers">
            <div>Profile</div>
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div></div>
          </div>
          <ul className="contact-list">
            {contacts.map(contact => (
              <li key={contact.id}>
                <Contact contact={contact} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="empty-state">
          <p>
            {searchTerm 
              ? "No contacts found matching your search."
              : "No contacts yet. Add your first contact!"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
