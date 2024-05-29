import {Alert, Col} from "react-bootstrap";

export function errorHandlingContact(error) {

    let errorContent = null;

    let errorMessageSalutation;
    let errorMessageFirstname;
    let errorMessageLastname;
    let errorMessageCompany;
    let errorMessageEmail;
    let errorMessageTelephonePrivate;
    let errorMessageTelephoneBusiness;
    let errorMessageRole;
    let errorMessageCalendarEnglish;
    let errorMessageCalendarGerman;
    let errorMessageAnnualReport;
    let errorMessageStreet;
    let errorMessageStreetAddition;
    let errorMessageCity;
    let errorMessageZip;
    let errorMessageCountry;

    let salutationClassName;
    let firstnameClassName;
    let lastnameClassName;
    let companyClassName;
    let emailClassName;
    let telephonePrivateClassName;
    let telephoneBusinessClassName;
    let roleClassName;
    let calendarEnglishClassName;
    let calendarGermanClassName;
    let annualReportClassName;
    let streetClassName;
    let streetAdditionClassName;
    let cityClassName;
    let zipClassName;
    let countryClassName;

    let isError = false;

    if (error) {
        isError = true;

        for (let i = 0; i < error.data.errors?.length; i++) {
            switch (error.data.errors[i].path) {
                case 'salutation':
                    salutationClassName = 'is-invalid';
                    errorMessageSalutation = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
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
                case 'company':
                    companyClassName = 'is-invalid';
                    errorMessageCompany = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>);
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
                case 'telephonePrivate':
                    telephonePrivateClassName = 'is-invalid';
                    errorMessageTelephonePrivate = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'telephoneBusiness':
                    telephoneBusinessClassName = 'is-invalid';
                    errorMessageTelephoneBusiness = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>);
                    break;
                case 'role':
                    roleClassName = 'is-invalid';
                    errorMessageRole = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'calendarEnglish':
                    calendarEnglishClassName = 'is-invalid';
                    errorMessageCalendarEnglish = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'calendarGerman':
                    calendarGermanClassName = 'is-invalid';
                    errorMessageCalendarGerman = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>);
                    break;
                case 'annualReport':
                    annualReportClassName = 'is-invalid';
                    errorMessageAnnualReport = (
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
                case 'address.streetAddition':
                    streetAdditionClassName = 'is-invalid';
                    errorMessageStreetAddition = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>);
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
                {errorMessageSalutation}
                {errorMessageFirstname}
                {errorMessageLastname}
                {errorMessageCompany}
                {errorMessageEmail}
                {errorMessageTelephonePrivate}
                {errorMessageTelephoneBusiness}
                {errorMessageRole}
                {errorMessageCalendarEnglish}
                {errorMessageCalendarGerman}
                {errorMessageAnnualReport}
                {errorMessageStreet}
                {errorMessageStreetAddition}
                {errorMessageCity}
                {errorMessageZip}
                {errorMessageCountry}
            </>
        );
    }

    return {
        errorContent,
        classNames: {
            salutationClassName,
            firstnameClassName,
            lastnameClassName,
            companyClassName,
            emailClassName,
            telephonePrivateClassName,
            telephoneBusinessClassName,
            roleClassName,
            calendarEnglishClassName,
            calendarGermanClassName,
            annualReportClassName,
            streetClassName,
            streetAdditionClassName,
            cityClassName,
            zipClassName,
            countryClassName
        }
    };
}