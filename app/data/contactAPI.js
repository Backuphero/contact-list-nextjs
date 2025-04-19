const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/8847/8847419.png';

const ContactAPI = {
  contacts: [],

  all() {
    return [...this.contacts];
  },

  get(id) {
    if (typeof id !== 'number') {
      throw new Error('ID must be a number');
    }
    return this.contacts.find(contact => contact.id === id);
  },

  addContact({ id, name, email, phone_number, image_url }) {
    if (!id || !name || !email) {
      throw new Error('ID, name, and email are required');
    }

    if (this.contacts.some(contact => contact.id === id)) {
      throw new Error('Contact with this ID already exists');
    }

    const newContact = {
      id,
      name,
      email,
      phone_number: phone_number || '',
      image_url: image_url || DEFAULT_PROFILE_IMAGE
    };

    this.contacts.push(newContact);
    return newContact;
  },

  remove(contact) {
    if (!contact || !contact.id) {
      throw new Error('Valid contact with ID is required');
    }

    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      throw new Error('Contact not found');
    }

    this.contacts.splice(index, 1);
    return [...this.contacts];
  },

  editContact({ id, name, email, phone_number, image_url }) {
    if (!id || !name || !email) {
      throw new Error('ID, name, and email are required');
    }

    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Contact not found');
    }

    const updatedContact = {
      ...this.contacts[index],
      name,
      email,
      phone_number: phone_number || this.contacts[index].phone_number,
      image_url: image_url || this.contacts[index].image_url || DEFAULT_PROFILE_IMAGE
    };

    this.contacts[index] = updatedContact;
    return updatedContact;
  },

  search(query) {
    if (!query) return [...this.contacts];
    
    const searchTerm = query.toLowerCase();
    return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.phone_number?.toLowerCase().includes(searchTerm)
    );
  }
};

export { ContactAPI };
