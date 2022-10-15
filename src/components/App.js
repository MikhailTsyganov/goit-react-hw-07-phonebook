import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import {
  useCreateEntryMutation,
  useGetContactsQuery,
} from 'redux/phonebook/phonebook-slice';
import FadeLoader from 'react-spinners/FadeLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

function App() {
  const { data, error, isFetching } = useGetContactsQuery();
  const [onSubmit, { isLoading }] = useCreateEntryMutation();
  console.log(data);
  return (
    <div className={s.container}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={onSubmit} isLoading={isLoading} />
      {data && data.length !== 0 && (
        <div>
          <h2>Contacts</h2>
          <Filter />

          <ContactList contacts={data} />
        </div>
      )}
      {error && toast('Not Found! Try again later')}
      {isFetching && (
        <FadeLoader cssOverride={{ display: 'block', margin: '20px auto' }} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
