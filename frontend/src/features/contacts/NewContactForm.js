import {useEffect, useState} from "react";
import {useAddNewContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";

const NewContactForm = () => {
    useTitle('LeoContacts - New Contact');

    const [addNewContact, {
        isSuccess,
        error
    }] = useAddNewContactMutation();

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (isSuccess) {
            setFirstname('');
            setLastname('');
            setEmail('');
            setAddress('');
            navigate('/dash/contacts');
        }
    }, [isSuccess, navigate]);

    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onStreetChanged = e => setAddress({...address, street: e.target.value}); //TODO: fix this
    const onCityChanged = e => setAddress({...address, city: e.target.value});
    const onZipChanged = e => setAddress({...address, zip: e.target.value});
    const onCountryChanged = e => setAddress({...address, country: e.target.value});

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await addNewContact({firstname, lastname, email, address});
    };

    return (
        <>
            <p className="error">{error?.data?.errors[0]?.msg}</p>

            <form className="form" onSubmit={onSaveContactClicked}>
                <div className="form__title-row">
                    <h2>New Contact</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                        >
                            <FontAwesomeIcon icon={faSave}/>
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

                <label className="form__label" htmlFor="password">
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
                    value={address.street}
                    onChange={onStreetChanged}
                />

                <label className="form__label" htmlFor="city">
                    City:</label>
                <input
                    className={`form__input`}
                    id="city"
                    name="city"
                    type="city"
                    value={address.city}
                    onChange={onCityChanged}
                />

                <label className="form__label" htmlFor="zip">
                    Zip:</label>
                <input
                    className={`form__input`}
                    id="zip"
                    name="zip"
                    type="zip"
                    value={address.zip}
                    onChange={onZipChanged}
                />

                <label className="form__label" htmlFor="country">
                    Country:</label>
                <input
                    className={`form__input`}
                    id="country"
                    name="country"
                    type="country"
                    value={address.country}
                    onChange={onCountryChanged}
                />
            </form>
        </>
    );
};
export default NewContactForm;