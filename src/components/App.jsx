import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactsList from './contactsList/ContactsList';
import s from './App.module.css';

const CONTACTS = 'contacts';

const getLSContacts = () => {
  const contacts = localStorage.getItem(CONTACTS);
  return JSON.parse(contacts);
};

const App = () => {
  const [contacts, setContacts] = useState(() => getLSContacts() || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = data => {
    if (checkRepeatContact(data)) {
      return Report.failure(`${data.name} is already in contacts.`);
    }
    setContacts(prev => [...prev, data]);
  };

  const getFilterSearchContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterSearchContact = getFilterSearchContact();

  const checkRepeatContact = data => {
    return contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
  };

  const deleteContact = id =>
    setContacts(contacts.filter(contact => contact.id !== id));

  return (
    <div className={s.container}>
      <h1 className={s.mainTitle}>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2 className={s.secondaryTitle}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactsList
        filterSearchContact={filterSearchContact}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
