"use client";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import EditButtons from "./EditButtons";

export function ErrorState({ title, message }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link href="/contacts" className="block">
        Back to Contacts
      </Link>
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

function Contact({ contact, onDelete }) {
  return (
    <li className="contact-item">
      <div className="contact-profile">
        <Image
          src={contact.image_url}
          alt={`${contact.name}'s profile picture`}
          width={40}
          height={40}
          className="profile-image"
          unoptimized
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/8847/8847419.png";
          }}
        />
      </div>
      <div className="contact-name">
        <Link href={`/contacts/${contact.id}`} className="name-link">
          {contact.name}
        </Link>
      </div>
      <div className="contact-email" title={contact.email}>
        {contact.email}
      </div>
      <div className="contact-phone">
        {contact.phone_number || "—"}
      </div>
      <div className="contact-actions">
        <EditButtons contact={contact} onDelete={onDelete} />
      </div>
    </li>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    image_url: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

Contact.defaultProps = {
  contact: {},
  onDelete: () => {},
};

export default Contact;
