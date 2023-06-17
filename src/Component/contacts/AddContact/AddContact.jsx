import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
import axios from 'axios';
let AddContact = () => {
    let navigate = useNavigate();
    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId:''
        },
        groups: [],
        errorMessage:''
    });

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };
    const getGroup = async () => {
        try {
            setState({ ...state, loading: true });
            // let response = await ContactService.getGroups();
      let response = await axios.get("http://localhost:9000/groups")
      console.log("res",response);
            setState({
                ...state,
                loading: false,
                groups: response.data
              });
          
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
        getGroup()
    }, []);
    
    let submitForm = async(event) => {
        event.preventDefault();
        try {
            console.log("i am working",state.contact);
            let res = await axios.post(`http://localhost:9000/contacts`, state.contact)
            console.log(res);
            // let res = await ContactService.createContact(state.contact);
            if (res) {
               navigate('/contact/list',{replace:true}) ;
            }
         }
        catch (error) {
            setState({ ...state, errorMessage: error.message });
            navigate('/contact/add', { replace: false });
        }
}

    let {loading,contact,groups,errorMessage} = state;
    return (
        <React.Fragment>
            <section className="add-contact p-3
            ">
                <div className="container"><div className="row">
                    <div className="col">
                        <p className="h4 text-success fw-bold">Create Contact</p></div>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, inventore.</p></div>
                    <div className="row">
                        <div className="col-md-4">
                        <form onSubmit={submitForm} >
                            <div className="mb-2">
                                    <input 
                                        required={ true} name="name" value={contact.name} onChange={ updateInput}     type="text" className='form-control ' placeholder='Name' /></div>
                            <div className="mb-2">
                                <input required={ true} name="photo" value={contact.photo} onChange={ updateInput} type="text" className='form-control ' placeholder='Photo url' /></div>
                            <div className="mb-2">
                                    <input
                                    required={ true} name="mobile" value={contact.mobile} onChange={ updateInput} type="number" className='form-control ' placeholder='Mobile' /></div>
                            <div className="mb-2">
                                <input required={ true} name="email" value={contact.email} onChange={ updateInput} type="email" className='form-control ' placeholder='Email' /></div>
                            <div className="mb-2">
                                    <input
                                    required={ true} name="company" value={contact.company} onChange={ updateInput} type="text" className='form-control ' placeholder='Company' /></div>

                            <div className="mb-2">
                                    <input
                                    required={ true} name="title" value={contact.title} onChange={ updateInput} type="text" className='form-control ' placeholder='Title' /></div>

                            <div className="mb-2">
                                <select required={ true} name="groupId" value={contact.groupId} onChange={ updateInput} className="form-control" id="">
                                        <option value="">Select a Group</option>                
                                        { 
                                            groups.length > 0 && groups.map(group=>{
                                                return (
                                                    <option key={group.id} value={group.id}>{ group.name}</option>
               )                             
})

                                        }</select>
                                        </div>
                            <div className="mb-2"><input type="submit" className='btn btn-success' value='Create' />
                                <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                            </div>
                
                    </form>
            </div>
        </div>
             </div >
        </section >
    
        </React.Fragment >
    )
};
export default AddContact;