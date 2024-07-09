import {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {useRouter} from 'src/routes/hooks';
import {bgGradient} from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import {UserContext} from 'src/context/UserContext';
import ErrorMessage from './ErrorMessage';
import {login} from "../../utils/apis";

export default function LoginView() {
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {setToken, setEmail} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false); // Add this line
    const [resend, setResend] = useState(false)
    const theme = useTheme();

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        // Email validation
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setIsLoading(false)
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // Password validation
        if (typeof password !== 'string') {
            setErrorMessage('Password must be a string');
            return;
        }
        // TODO Add Some Extra Layers to Secure the Password
        if (password.length < 8) {
            setIsLoading(false)
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        // Check if email or password is empty
        if (!email || !password) {
            setIsLoading(false)
            setErrorMessage('Email and password cannot be empty');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`),
        };

        try {
            const response = await login(requestOptions);
            const data = await response.json();
            console.log(response)
            console.log(data)
            if (!response.ok) {
                setErrorMessage(data.detail);
            } else {
                setToken(data.access_token);
                router.push('/'); // index page
            }

            if (response.status === 401) {
                setEmail(email)
                setResend(true)
            }

        } catch (error) {
            // Handle any errors that occurred during the fetch operation
            setErrorMessage(`An error occurred. Please try again. ${error}`);
        } finally {
            setIsLoading(false)
        }
    }

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address" onChange={e => setUserEmail(e.target.value)}/>
                <TextField
                    name="password"
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <ErrorMessage message={errorMessage}/>
            {resend && <Typography variant="body2" sx={{mt: 2, mb: 5}}>
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
                Login
            </LoadingButton>
            <Typography component={Link} to="/forgot_password" variant="body2" sx={{
                mt: 1, mb: 2, color: '#ff0000', textDecoration: 'none', cursor: 'pointer'
            }}>
                Forgot Password?
            </Typography>
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
                    }}
                >
                    <Typography variant="h4" mb={4}>Sign in to Genbase</Typography>

                    {renderForm}
                    <Typography variant="body2" sx={{mt: 5, mb: 2}}>
                        Don’t have an account?&nbsp;
                        <Link to='/signup' variant="subtitle2" style={{
                            textDecoration: 'none'
                        }}>
                            Get started
                        </Link>
                    </Typography>
                </Card>
            </Stack>
        </Box>
    );
}

