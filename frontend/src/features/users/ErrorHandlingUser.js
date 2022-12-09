import {Alert, Col} from "react-bootstrap";

export function errorHandlingUser(error) {

    let errorContent;
    let errorMessageUser;
    let errorMessagePassword;
    let errorMessageEmail;

    let userClassName;
    let passwordClassName;
    let emailClassName;

    let isError = false;

    if (error) {
        isError = true;
        console.log(error);
        for (let i = 0; i < error.data.errors?.length; i++) {
            switch (error.data.errors[i].param) {
                case 'username':
                    userClassName = 'is-invalid';
                    errorMessageUser = (
                        <Col className={"text-center"}>
                            <Alert show={isError} variant="danger">
                                {error.data.errors[i].msg}
                            </Alert>
                        </Col>
                    );
                    break;
                case 'password':
                    passwordClassName = 'is-invalid';
                    errorMessagePassword = (
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
                default:
                    break;
            }
        }

        errorContent = (
            <>
                {errorMessageUser}
                {errorMessagePassword}
                {errorMessageEmail}
            </>
        );
    }

    return {
        errorContent,
        userClassName,
        passwordClassName,
        emailClassName
    };
}