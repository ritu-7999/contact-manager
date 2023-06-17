import logo from './logo.svg';
import React from 'react';
import Spinner from './Component/Spinner/Spinner'
import './App.css';
import { Routes, Route,Navigate } from 'react-router-dom';
import NavBar from './Component/NavBar/NavBar';
import ContactList from './Component/contacts/ContactList/ContactList';
import AddContact from './Component/contacts/AddContact/AddContact';
import ViewContact from './Component/contacts/ViewContact/ViewContact';
import EditContact from './Component/contacts/EditContact/EditContact';
let App=()=> {
  return (
    <React.Fragment>
      
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Navigate to ={'/contact/list'}/>} />
        <Route path={'/contact/list'} element={<ContactList />} />
        <Route path={'/contact/add'} element={<AddContact/>} />
      
      <Route path={'/contact/view/:contactId'} element={<ViewContact />} />
        <Route path={'/contact/edit/:contactId'} element={<EditContact />} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
