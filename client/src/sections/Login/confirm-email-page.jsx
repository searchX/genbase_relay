import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {confirmEmail} from "../../utils/apis";

const EmailVerificationPage = () => {

    const {search} = useLocation(); // browser url
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);

    async function ConfirmEmail(_token) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }

        try {
            const response = await confirmEmail(_token, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.detail);
                setEmailVerified(false);
            } else {
                setEmailVerified(true);
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch operation
            setErrorMessage('An error occurred. Please try again.');
        }
    }


    useEffect(() => {
        const url = new URLSearchParams(search);
        if (!url.has('token')) {
            navigate('/login');
        } else {
            const token = url.get('token');
            ConfirmEmail(token)
            console.log(token)
        }
        console.log(search)
    }, [search]);
    return (<>        {!errorMessage && (
            <div>
                {emailVerified ? (
                    <div>
                        <h1>Email Confirmed</h1>
                        <p>
                            Email has been confirmed. You can now
                            <a href="/login"> Login</a>
                        </p>
                    </div>
                ) : (
                    <div>
                        Email is Verifying
                    </div>
                )}
            </div>)}
            {errorMessage}
        </>
    )
}
export default EmailVerificationPage;