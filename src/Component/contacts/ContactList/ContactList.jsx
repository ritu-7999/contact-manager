import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
let ContactList = () => {

  let [query, setQuery] = useState({
    text: ''
  });


  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  });
  const [isRefress, setRefress] = useState(false);
  const getContact = async () => {
    try {
      setState({ ...state, loading: true });
      let response = await ContactService.getAllContacts();
      setState({ ...state, loading: false, contacts: response.data,
      filteredContacts: response.data });

    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      });
    }
  }
    useEffect(() => {
      getContact() 
    },[isRefress])//isRefress=false'
  let { loading, contacts, filteredContacts, errorMessage } = state;
  
  let clickDelete = async (contactId) => {
    console.log(" i am deleting function",contactId);
    try {
    // let res = await ContactService.deleteContact(contactId);
      let contact = await axios.get("http://localhost:9000/contacts")
      console.log("contact",contact.data);
      let res = await axios.delete(`http://localhost:9000/contacts/${contactId}`,contact.data)
      console.log("response", res);
      setRefress(!isRefress);//true//false
      if (res) {
        setState({ ...state, loading: true });
        let response = contact;
        setState({ ...state, loading: false, contacts: response.data,filteredContacts: response.data });
        console.log("state",state);
      }
    }
    catch(error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      });
    }
  }

  let searchContacts = (event) => {
    setQuery({
      ...query, text: event.target.value
    });
    let thecontacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts:thecontacts
    });

}


    return (
      <>
        
        <section className="contact-search p-4">
          <div className="container">
            <div className="grid">
              <div className="row">
                <div className="col">
                  <p className="h3 fw-bold">
                    Contact Manager
                    <Link to={"/contact/add"} className="btn btn-primary ms-3">
                      <i className="fa fa-plus-circle me-2"> New</i>
                    </Link>
                  </p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio ut eos saepe deserunt optio. Consequuntur ex ut ea
                    beatae. Ad.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form className="row">
                    <div className="col">
                      <div className="mb-2">
                        <input name="text" value={query.text}
                          onChange={searchContacts}
                          type="text"
                          className="form-control"
                          placeholder="Search Names"
                        />{" "}
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn btn-outline-dark"
                          value="Search"
                        />{" "}
                      </div>
                    </div>{" "}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? <Spinner /> : (<>
        
        
          <section className="contact-list">
            <div className="container">
              <div className="row ">
                {
                  
                  filteredContacts.length > 0 && filteredContacts.map(contact => {

                    return (
    
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  alt=""
                                  className="img-fluid contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name: <span className="fw-bold">{contact.name}</span>
                                  </li>
      
                                  <li className="list-group-item list-group-item-action">
                                    Mobile: <span className="fw-bold">{contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold">{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contact/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contact/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button onClick={() => {
                                  clickDelete(contact.id)             
                                }}  className="btn btn-danger my-1">
                                  {" "}
                                  <i className="fa fa-trash"></i>{" "}
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )

                  })



                }
                
              
              </div>
            </div>
          </section>
        </>
        )}
        
        </>
    )
  }
  export default ContactList;
