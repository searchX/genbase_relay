import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Link, useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {bgGradient} from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import ErrorMessage from './ErrorMessage';
import {resetPassword} from "../../utils/apis";

export default function ResetPassword() {
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add this line
    const [resend, setResend] = useState(false)
    const theme = useTheme();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [sucess, setSucess] = useState(false)
    useEffect(() => {
        //write code to get token
        const _token = new URLSearchParams(location.search).get('token');
        // if (!_token) {
        //     router.push('/forgot-password');
        // }
        setToken(_token)
        console.log(_token)
    }, [location]);


    const validateInput = () => {
        if (typeof password !== 'string') {
            return 'Password must be a string';
        }

        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match';
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
            body: JSON.stringify({'token': token, 'new_password': password}),
        };

        try {
            const response = await resetPassword(requestOptions);
            const data = await response.json();
            console.log(response)
            console.log(data)
            if (!response.ok) {
                setErrorMessage(data.detail);
            }

            if (response.status === 401) {
                setResend(true)
            }
            setSucess(true)
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
                <TextField
                    value={password}
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
                /> <TextField
                value={confirmPassword}
                name="confirm_password"
                label="Confirm Password"
                onChange={e => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword((v) => !v)} edge="end">
                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
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
                    <Typography variant="h4" mb={4}>Reset Password</Typography>
                    {sucess ? <Typography variant="h4" mb={4}>Password Reset Successfully</Typography> : <> {renderForm}
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

