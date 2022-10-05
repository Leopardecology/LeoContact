import {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const NAME_REGEX = /^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]{3,20}$/;
const ADDRESS_REGEX = /^[A-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]{3,20}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const EditContactForm = ({contact}) => {

        const [updateContact, {
            isLoading,
            isSuccess,
            isError,
            error
        }] = useUpdateContactMutation();

        const [deleteContact, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delerror
        }] = useDeleteContactMutation();

        const navigate = useNavigate();

        const [firstname, setFirstname] = useState(contact.firstname);
        const [validFirstname, setValidFirstname] = useState(false);
        const [lastname, setLastname] = useState(contact.lastname);
        const [validLastname, setValidLastname] = useState(false);
        const [email, setEmail] = useState(contact.email);
        const [validEmail, setValidEmail] = useState(false);
        const [address, setAddress] = useState(contact.address);
        const [validAddress, setValidAddress] = useState(false);


        useEffect(() => {
            setValidFirstname(NAME_REGEX.test(String(firstname)));
        }, [firstname]);

        useEffect(() => {
            setValidLastname(NAME_REGEX.test(String(lastname)));
        }, [lastname]);

        useEffect(() => {
            setValidEmail(EMAIL_REGEX.test(String(email)));
        }, [email]);

        useEffect(() => {
            setValidAddress(ADDRESS_REGEX.test(String(address)));
        }, [address]);


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

        let canSave;
        canSave = [validFirstname, validLastname, validEmail, validAddress].every(Boolean) && !isLoading;


        const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
        const validFirstnameClass = !validFirstname ? 'form__input--incomplete' : '';
        const validLastnameClass = !validLastname ? 'form__input--incomplete' : '';
        const validEmailClass = !validEmail ? 'form__input--incomplete' : '';
        const validAddressClass = !validAddress ? 'form__input--incomplete' : '';

        const errContent = (error?.data?.message || delerror?.data?.message) ?? '';


        return (
            <>
                <p className={errClass}>{errContent}</p>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form__title-row">
                        <h2>Edit Contact</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveContactClicked}
                                disabled={!canSave}
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
                        className={`form__input ${validFirstnameClass}`}
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="off"
                        value={String(firstname)}
                        onChange={onFirstnameChanged}
                    />

                    <label className="form__label" htmlFor="lastname">
                        Lastname: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        className={`form__input ${validLastnameClass}`}
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={String(lastname)}
                        onChange={onLastnameChanged}
                    />

                    <label className="form__label" htmlFor="email">
                        Email: <span className="nowrap">[only Emails]</span></label>
                    <input
                        className={`form__input ${validEmailClass}`}
                        id="email"
                        name="email"
                        type="email"
                        value={String(email)}
                        onChange={onEmailChanged}
                    />

                    {/*ADDRESS*/}

                   <label> <h2>Address:</h2> </label>

                    <label className="form__label" htmlFor="street">
                        Street:</label>
                    <input
                        className={`form__input ${validAddressClass}`}
                        id="street"
                        name="street"
                        type="street"
                        value={String(address.street)}
                        onChange={onStreetChanged}
                    />

                    <label className="form__label" htmlFor="city">
                        City:</label>
                    <input
                        className={`form__input ${validAddressClass}`}
                        id="city"
                        name="city"
                        type="city"
                        value={String(address.city)}
                        onChange={onCityChanged}
                    />

                    <label className="form__label" htmlFor="zip">
                        Zip:</label>
                    <input
                        className={`form__input ${validAddressClass}`}
                        id="zip"
                        name="zip"
                        type="zip"
                        value={String(address.zip)}
                        onChange={onZipChanged}
                    />

                    <label className="form__label" htmlFor="country">
                        Country:</label>
                    <input
                        className={`form__input ${validAddressClass}`}
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