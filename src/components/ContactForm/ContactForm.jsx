import { Button, Form, Input } from "./ContactForm.styled";
import { useState } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from '../../redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const contact = {
      name,
      phone,
    };

    const enterContacts = contacts.some(
      contact =>
        (contact.name === name.toLowerCase() && contact.phone === phone) ||
        contact.phone === phone
    );

    enterContacts
      ? alert(`${name} or ${phone} is already in contacts`)
      : addContact(contact);

    setName('');
    setNumber('');
  };

        return (
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                <Input
                    type="tel"
                    name="number"
                    value={phone}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <Button type="submit">Add contact</Button>
            </Form>
        );
}

export default ContactForm;