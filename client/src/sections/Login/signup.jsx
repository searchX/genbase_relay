import {useContext, useState} from 'react';
import Box from '@mui/material/Box';
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
import ErrorMessage from 'src/sections/Login/ErrorMessage';
import {signup} from "../../utils/apis";
import {Link} from "react-router-dom";

export default function Signup() {
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setconfirmationPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    // const [phoneNumber, setphoneNumber] = useState('');
    // const [companyName, setcompanyName] = useState('');
    // const [companySize, setcompanySize] = useState('');
    // const [mcNumber, setmcNumber] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add this line at the beginning of your component
    const {setEmail} = useContext(UserContext);

    const submitRegistration = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            }),
        };

        try {
            const response = await signup(requestOptions);
            const data = await response.json();
            if (!response.ok) {
                seterrorMessage(data.detail);
            } else {
                setEmail(data.email)
                router.push('/login')
            }
        } catch (error) {
            seterrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!email || !password || !firstName || !lastName) {
            seterrorMessage("All fields are required");
            return;
        }

        // Email validation
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            seterrorMessage('Please enter a valid email address');
            return;
        }

        // Password validation
        if (typeof password !== 'string') {
            seterrorMessage('Password must be a string');
            return;
        }
        if (password.length < 8) {
            seterrorMessage('Password must be at least 8 characters long');
            return;
        }

        // Check if password and confirmation password match
        if (password !== confirmationPassword) {
            seterrorMessage("Ensure that the password match");
            return;
        }

        // Check for uppercase, lowercase, digit and special character
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+\-={};':"\\|,.<>?]+/;
        if (!uppercaseRegex.test(password)) {
            seterrorMessage('Password must contain at least one uppercase letter');
            return;
        }

        if (!lowercaseRegex.test(password)) {
            seterrorMessage('Password must contain at least one lowercase letter');
            return;
        }

        if (!digitRegex.test(password)) {
            seterrorMessage('Password must contain at least one digit');
            return;
        }

        if (!specialCharRegex.test(password)) {
            seterrorMessage('Password must contain at least one special character');
            return;
        }

        // Phone number validation
        // const phoneNumberRegex = /^\d{10}$/;
        // if (!phoneNumberRegex.test(phoneNumber)) {
        //     seterrorMessage('Please enter a valid phone number');
        //     return;
        // }
        // const mcNumberRegex = /^\d{6}$/;
        // if (!mcNumberRegex.test(mcNumber)) {
        //     seterrorMessage('MC number must be exactly 6 digits long and should be an integer');
        //     return;
        // }
        // const companySizeRegex = /^[0-9]+$/;
        // if (!companySizeRegex.test(companySize)) {
        //     seterrorMessage('Company size must be a numerical value');
        //     return;
        // }
        submitRegistration();
    }


    const theme = useTheme();

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const renderForm = (
        <>
            <Stack spacing={3} pt={3}>
                <TextField name="fisrtName" label="First Name"
                           onChange={e => setfirstName(e.target.value)}
                           required/>
                <TextField name="lastName" label="Last Name"
                           onChange={e => setlastName(e.target.value)}
                           required/>
                <TextField name="email" label="Email address"
                           onChange={e => setUserEmail(e.target.value)}
                           required/>
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

                <TextField
                    name="confirmation password"
                    label="Confirm Password"
                    onChange={e => setconfirmationPassword(e.target.value)}
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
                {/* <TextField name="phoneNumber" label="Phone Number"
                           onChange={e => setphoneNumber(e.target.value)}/>
                <TextField name="companyName" label="Company Name"
                           onChange={e => setcompanyName(e.target.value)}/>
                <TextField name="companySize" label="Company Size"
                           onChange={e => setcompanySize(e.target.value)}/>
                <TextField name="mc" label="MC Number"
                           onChange={e => setmcNumber(e.target.value)}/> */}
            </Stack>

            <ErrorMessage message={errorMessage}/>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
                loading={isLoading}
            >
                SignUp
            </LoadingButton>

            <Typography variant="body2" sx={{mt: 5, mb: 2}}>
                Already have an account?&nbsp;
                <Link to='/login' variant="subtitle2" style={{
                    textDecoration: 'none', cursor: 'pointer'
                }}>
                    Login
                </Link>
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
                        overflowY: 'auto', // Enable vertical scrolling
                        maxHeight: '80vh', // Set max height to limit scrolling,
                        '&::-webkit-scrollbar': {display: 'none'}
                    }}>
                    <Typography variant="h4">Sign Up to Genbase</Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}

