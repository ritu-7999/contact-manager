import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
let EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });
  let data = async () => {
    try {
      setState({ ...state, loading: true });
      let res = await axios.get(`http://localhost:9000/contacts/${contactId}`);
      let groupRes = await axios.get("http://localhost:9000/groups");
      setState({
        ...state,
        loading: false,
        contact: res.data,
        groups: groupRes.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };
  useEffect(() => {
    data();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
      try {
          console.log("update input", state.contact);
          
          let res = await axios.put(`http://localhost:9000/contacts/${contactId}`, state.contact);
          console.log("response",res)
      // let res = await ContactService.createContact(state.contact);
      if (res) {
        navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contact/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section
            className="Edit-contact p-3
                "
          >
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                </div>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat, inventore.
                </p>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        className="form-control "
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        className="form-control "
                        placeholder="Photo url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        required="true"
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        className="form-control "
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control "
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control "
                        placeholder="Company"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required="true"
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className="form-control "
                        placeholder="Title"
                      />
                    </div>

                    <div className="mb-2">
                      <select
                        required="true"
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                        className="form-control"
                        id=""
                      >
                        <option value="">Select a Group</option>{" "}
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}{" "}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contact/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} className="contact-img" alt="" />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default EditContact;
