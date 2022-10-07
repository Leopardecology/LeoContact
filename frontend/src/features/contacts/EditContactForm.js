import {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const EditContactForm = ({contact}) => {

        const [updateContact, {
            isSuccess,
        }] = useUpdateContactMutation();

        const [deleteContact, {
            isSuccess: isDelSuccess,
        }] = useDeleteContactMutation();

        const navigate = useNavigate();

        const [firstname, setFirstname] = useState(contact.firstname);
        const [lastname, setLastname] = useState(contact.lastname);
        const [email, setEmail] = useState(contact.email);
        const [address, setAddress] = useState(contact.address);

        useEffect(() => {
            console.log(isSuccess);
            if (isSuccess || isDelSuccess) {
                setFirstname('');
                setLastname('');
                setEmail('');
                setAddress('');
                navigate('/dash/contacts');
            }

        }, [isSuccess, isDelSuccess, navigate]);

        const onFirstnameChanged = e => setFirstname(e.target.value);
        const onLastnameChanged = e => setLastname(e.target.value);
        const onEmailChanged = e => setEmail(e.target.value);
        const onStreetChanged = e => setAddress({...address, street: e.target.value});
        const onCityChanged = e => setAddress({...address, city: e.target.value});
        const onZipChanged = e => setAddress({...address, zip: e.target.value});
        const onCountryChanged = e => setAddress({...address, country: e.target.value});

        const onSaveContactClicked = async () => {
            await updateContact({id: contact.id, firstname, lastname, email, address});
        };

        const onDeleteContactClicked = async () => {
            await deleteContact({id: contact.id});
        };

        return (
            <>
                <p className=""></p>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form__title-row">
                        <h2>Edit Contact</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveContactClicked}
                            >
                                <FontAwesomeIcon icon={faSave}/>
                            </button>
                            <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteContactClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </div>
                    </div>
                    <label className="form__label" htmlFor="firstname">
                        Firstname: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input`}
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="off"
                        value={String(firstname)}
                        onChange={onFirstnameChanged}
                    />

                    <label className="form__label" htmlFor="lastname">
                        Lastname: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input`}
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={String(lastname)}
                        onChange={onLastnameChanged}
                    />

                    <label className="form__label" htmlFor="email">
                        Email: <span className="nowrap">[only Emails]</span></label>
                    <input
                        className={`form__input`}
                        id="email"
                        name="email"
                        type="email"
                        value={String(email)}
                        onChange={onEmailChanged}
                    />

                    {/*ADDRESS*/}

                    <label><h2>Address:</h2></label>

                    <label className="form__label" htmlFor="street">
                        Street:</label>
                    <input
                        className={`form__input`}
                        id="street"
                        name="street"
                        type="street"
                        value={String(address.street)}
                        onChange={onStreetChanged}
                    />

                    <label className="form__label" htmlFor="city">
                        City:</label>
                    <input
                        className={`form__input`}
                        id="city"
                        name="city"
                        type="city"
                        value={String(address.city)}
                        onChange={onCityChanged}
                    />

                    <label className="form__label" htmlFor="zip">
                        Zip:</label>
                    <input
                        className={`form__input`}
                        id="zip"
                        name="zip"
                        type="zip"
                        value={String(address.zip)}
                        onChange={onZipChanged}
                    />

                    <label className="form__label" htmlFor="country">
                        Country:</label>
                    <input
                        className={`form__input`}
                        id="country"
                        name="country"
                        type="country"
                        value={String(address.country)}
                        onChange={onCountryChanged}
                    />
                </form>
            </>
        );
    }
;

export default EditContactForm;