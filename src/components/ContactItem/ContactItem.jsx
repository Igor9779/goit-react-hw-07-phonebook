import React from 'react';
import { Button, Item } from './ContactItem.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Item>
      <p>
        {contact.name} : {contact.phone}
      </p>

      <Button type="button" onClick={() => handleDelete(Number(contact.id))}>
        Delete
      </Button>
    </Item>
  );
};

export default ContactItem;
