import {Alert, Col} from "react-bootstrap";

export function errorHandlingContact(error) {
    let errorContent;

    let errorMessageFirstname;
    let errorMessageLastname;
    let errorMessageEmail;
    let errorMessageStreet;
    let errorMessageCity;
    let errorMessageZip;
    let errorMessageCountry;

    let firstnameClassName;
    let lastnameClassName;
    let emailClassName;
    let streetClassName;
    let cityClassName;
    let zipClassName;
    let countryClassName;

    let isError = false;

    if (error) {
        isError = true;

        console.log(error);

        for (let i = 0; i < error.data.errors?.length; i++) {
            switch (error.data.errors[i].param) {
                case 'firstname':
                    firstnameClassName = 'is-invalid';
                    errorMessageFirstname = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'lastname':
                    lastnameClassName = 'is-invalid';
                    errorMessageLastname = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'email':
                    emailClassName = 'is-invalid';
                    errorMessageEmail = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'address.street':
                    streetClassName = 'is-invalid';
                    errorMessageStreet = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'address.city':
                    cityClassName = 'is-invalid';
                    errorMessageCity = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'address.zip':
                    zipClassName = 'is-invalid';
                    errorMessageZip = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'address.country':
                    countryClassName = 'is-invalid';
                    errorMessageCountry = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                default:
                    break;
            }
        }

        errorContent = (
            <>
                {errorMessageFirstname}
                {errorMessageLastname}
                {errorMessageEmail}
                {errorMessageStreet}
                {errorMessageCity}
                {errorMessageZip}
                {errorMessageCountry}
            </>
        );
    }

    return {
        errorContent,
        firstnameClassName,
        lastnameClassName,
        emailClassName,
        streetClassName,
        cityClassName,
        zipClassName,
        countryClassName
    };
}