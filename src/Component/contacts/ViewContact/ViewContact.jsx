import React, { useEffect, useState } from "react";
import { Link ,useParams} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
let ViewContact = () => {
  let { contactId } = useParams();
  console.log("i am working");
  // console.log("params",contactId);
  let [state,setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
    group:{}
  });

  const func = async () => {
    try {
      setState({ ...state, loading: true });
      console.log("response",contactId);
      // console.log("response",ContactService.getContact(contactId));
      // let res = await ContactService.getContact(contactId)
      let res = await axios.get(`http://localhost:9000/contacts/${contactId}`);
      console.log("res",res);
      // let res = await ContactService.getContact(contactId);
      let groupResponse = await
        ContactService.getGroup(res.data)
      setState({
        ...state, loading: false,
        contact: res.data,
        group:groupResponse.data
      });
      console.log(res.data);
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
    func()
  },[contactId]);


  let { loading,contact, errorMessage,group} = state;
  return (
    <React.Fragment>

      <section className="view-contact-intro p-3">
        <div className="container"></div>
        <div className="row">
          <div className="col">
            <p className="h3 text-warning fw-bold">View Contact</p>

            <p className="fst-italic">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              dolorem debitis aliquam dolores totam eveniet fuga accusamus ex
              natus officia?
            </p>
          </div>
        </div>
      </section>
      {
        loading?<Spinner/>:<React.Fragment>
        
          {
            Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&   <section className="view-contact mt-3">
            <div className="container">
              <div className="row align-item-center">
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    alt=""
                    className="contact-img"
                  />
                </div>
                          <div className="col-md-8">
                          <ul className="list-group">
                          <li className="list-group-item list-group-item-action">
                          Name: <span className="fw-bold">{contact.name }</span>
                      </li>
                    

    
                          <li className="list-group-item list-group-item-action">
                          Mobile: <span className="fw-bold">{ contact.mobile}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Email:{" "}
                            <span className="fw-bold">{ contact.email}</span>
                      </li>
                                  <li className="list-group-item list-group-item-action">
                                  Company: <span className="fw-bold">{ contact.company}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                Title: <span className="fw-bold">{ contact.title}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                  Group: <span className="fw-bold">{group.name}</span>
                                </li></ul>                
                          </div>
              </div>
              <div className="row">
                <div className="col">
                  <Link to={"/contact/list"} className="btn btn-warning">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </section>
       }
        
        
        </React.Fragment>
}





  
    </React.Fragment>
  );
};
export default ViewContact;
