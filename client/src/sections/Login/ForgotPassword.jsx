import {useState} from 'react';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import {bgGradient} from 'src/theme/css';
import Logo from 'src/components/logo';
import ErrorMessage from './ErrorMessage';
import {forgotPassword} from "../../utils/apis";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add this line
    const [resend, setResend] = useState(false)
    const theme = useTheme();
    const [mail, setMailSucess] = useState(false)
    const validateInput = () => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const _errorMessage = validateInput();
        if (_errorMessage) {
            setIsLoading(false)
            setErrorMessage(_errorMessage);
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({'email': email}),
        };

        try {
            const response = await forgotPassword(requestOptions);
            const data = await response.json();
            console.log(response)
            console.log(data)
            if (!response.ok) {
                setErrorMessage(data.detail);

            }
            if (response.status === 401) {
                setEmail(email)
                setResend(true)
            }
            setMailSucess(true)
        } catch (error) {
            // Handle any errors that occurred during the fetch operation
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false)
        }
    }

    const renderForm = (
        <>
            <Stack spacing={2}>
                <TextField name="email" label="Email address" onChange={e => setEmail(e.target.value)}/>
            </Stack>

            <ErrorMessage message={errorMessage}/>
            {resend &&
                <Typography variant="body2" sx={{mt: 2, mb: 5}}>
                    Didn't receive verification code?&nbsp;
                    <Link to='/verification' variant="subtitle2">
                        Resend
                    </Link>
                </Typography>}
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={isLoading}
                onClick={handleSubmit}
            >
                Forgot Password
            </LoadingButton>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: {xs: 16, md: 24},
                    left: {xs: 16, md: 24},
                }}
            />
            <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
                <Card
                    sx={{
                        '&::-webkit-scrollbar': {display: 'none'},
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}>
                    <Typography variant="h4" mb={4}>Forgot Password</Typography>
                    {mail ?
                        <Typography variant="h6" mb={4}>Mail Sent for Password Reset Check the Mail box</Typography>
                        : <>{renderForm}
                            <Typography variant="body2" sx={{mt: 5, mb: 2}}>
                                Don’t have an account?&nbsp;
                                <Link to='/signup' variant="subtitle2" style={{
                                    textDecoration: 'none'
                                }}>
                                    Get started
                                </Link>
                            </Typography>
                        </>}
                </Card>
            </Stack>
        </Box>
    );
}

