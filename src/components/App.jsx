import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container } from './App.styled';
import Notification from './Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectIsLoading, selectError } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter />
      ) : (
        <Notification text={'Your phonebook is empty. Add first contact!'} />
      )}
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </Container>
  );
};
