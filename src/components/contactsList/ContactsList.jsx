import PropTypes from 'prop-types';
import s from './ContactsList.module.css';

const ContactsList = ({ filterSearchContact, deleteContact }) => {
  return (
    <ul className={s.contactsList}>
      {filterSearchContact.map(contact => (
        <li className={s.contactsItem} key={contact.id}>
          <p className={s.contactName}>
            {contact.name}: {contact.number}
          </p>
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  filterSearchContact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
