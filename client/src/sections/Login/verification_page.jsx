import {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import {useRouter} from 'src/routes/hooks';
import {bgGradient} from 'src/theme/css';
import Logo from 'src/components/logo';
import ErrorMessage from 'src/sections/Login/ErrorMessage';
import {Button} from "@mui/material";
import {resendVerification} from "../../utils/apis";
import {UserContext} from "../../context/UserContext";

export default function EmailVerification() {
    const [errorMessage, setErrorMessage] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const theme = useTheme();
    const router = useRouter();
    const {email} = useContext(UserContext);
    useEffect(() => {
        if (email === '' || email === null) {
            router.push('/login')
        }
    }, [email]);

    useEffect(() => {
        let timer;
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
            setCountdown(60);
        }
        return () => clearTimeout(timer);
    }, [resendDisabled, countdown]);

    const handleResend = async () => {
        if (email === '' || email === null) {
            router.push('/login')
            return
        }
        setResendDisabled(true);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        };
        const response = await resendVerification(email, requestOptions)
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.detail);
        }

    }

    const handleLoginRedirect = () => {
        router.push('/login');
    }

    const handleSignupRedirect = () => {
        router.push('/signup');
    }

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
                    top: {xs: 10, md: 20},
                    left: {xs: 10, md: 20},
                }}
            />
            <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 520,
                        overflowY: 'auto',
                        maxHeight: '80vh',
                        '&::-webkit-scrollbar': {display: 'none'}
                    }}>
                    <Typography variant="h4">Email Verification</Typography>
                    <Typography variant="body1" py={1}>
                        A verification email has been sent. If you haven't received it, click the button below to resend
                        it.
                    </Typography>
                    <ErrorMessage message={errorMessage}/>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                        onClick={handleResend}
                        disabled={resendDisabled}
                    >
                        Resend Verification Email
                    </LoadingButton>
                    {resendDisabled &&
                        <Typography variant="body2">You can resend the email in {countdown} seconds.</Typography>}
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="inherit"
                        onClick={handleLoginRedirect}
                        sx={{mt: 2}}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="inherit"
                        onClick={handleSignupRedirect}
                        sx={{mt: 2}}
                    >
                        Signup
                    </Button>
                </Card>
            </Stack>
        </Box>
    );
}