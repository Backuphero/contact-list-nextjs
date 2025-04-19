"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContactAPI } from "../data/contactAPI";

function ContactForm({
  contact = { id: 0, name: "", email: "", phone_number: "", image_url: "" },
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: contact.name || "",
    email: contact.email || "",
    phone_number: contact.phone_number || "",
    image_url: contact.image_url || ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (contact.id) {
          ContactAPI.editContact({
            id: contact.id,
            ...formData
          });
        } else {
          ContactAPI.addContact({
            id: Math.round(Math.random() * 100000000),
            ...formData
          });
        }
        router.push("/contacts");
      } catch (error) {
        console.error('Failed to save contact:', error);
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          className="form-control"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="image_url">Profile Image URL</label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          className="form-control"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Enter image URL (optional)"
        />
      </div>

      {errors.submit && (
        <div className="alert alert-danger">
          {errors.submit}
        </div>
      )}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {contact.id ? "Update Contact" : "Add Contact"}
        </button>
        <Link href="/contacts" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    image_url: PropTypes.string,
  }),
};

export default ContactForm;
