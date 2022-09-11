import {useEffect, useState} from "react";
import {useAddNewContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from "@fortawesome/free-solid-svg-icons";

const NAME_REGEX = /^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]{3,20}$/;
const ADDRESS_REGEX = /^[A-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]{3,20}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const NewContactForm = () => {

    const [addNewContact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewContactMutation();

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    // const [address, setAddress] = useState('');
    // const [validAddress, setValidAddress] = useState(false);

    useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname));
    }, [firstname]);

    useEffect(() => {
        setValidLastname(NAME_REGEX.test(lastname));
    }, [lastname]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // useEffect(() => {
    //     setValidAddress(NAME_REGEX.test(address));
    // }, [address]);

    useEffect(() => {
        if (isSuccess) {
            setFirstname('');
            setLastname('');
            setEmail('');
            // setAddress('');
            navigate('/dash/contacts');
        }
    }, [isSuccess, navigate]);

    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    // const onAddressCHanged = e => setAddress(e.target.value);

    const canSave = [validFirstname, validLastname, validEmail].every(Boolean) && !isLoading;

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewContact({firstname, lastname, email});
        }
    };

    const errClass = isError ? "errmsg" : "offscreen";
    const validFirstnameClass = !validFirstname ? 'form__input--incomplete' : '';
    const validLastnameClass = !validLastname ? 'form__input--incomplete' : '';
    const validEmailClass = !validEmail ? 'form__input--incomplete' : '';
    // const validAddressClass = !validAddress ? 'form__input--incomplete' : '';


    return (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveContactClicked}>
                <div className="form__title-row">
                    <h2>New Contact</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="firstname">
                    Contactname: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validFirstnameClass}`}
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="off"
                    value={firstname}
                    onChange={onFirstnameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-20 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validLastnameClass}`}
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={onLastnameChanged}
                />

                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[only Emails]</span></label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onEmailChanged}
                />

                {/*<label className="form__label" htmlFor="address">*/}
                {/*    Address: <span className="nowrap">[address]</span></label>*/}
                {/*<input*/}
                {/*    className={`form__input ${validAddressClass}`}*/}
                {/*    id="address"*/}
                {/*    name="address"*/}
                {/*    type="address"*/}
                {/*    value={address}*/}
                {/*    onChange={onAddressCHanged}*/}
                {/*/>*/}
            </form>
        </>
    );
};
export default NewContactForm;