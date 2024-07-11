import React, {useContext, useState} from 'react';
import Modal from '@mui/material/Modal';
import {Box, Button, CircularProgress, Select, Stack, TextField, Typography} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import {useFormik} from "formik";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import {AddProject} from "../../redux/actions/actions";
import {useDispatch} from "react-redux";
import {UserContext} from "../../context/UserContext";

const AddNewProjectsModal = ({open, onClose}) => {
    const initialLoad = {
        load_number: "",
        total_rate: "",
        trailer_type: "",
        cargo_information: []
    }
    const [loading, setLoading] = useState(false);
    const [load, addLoad] = useState(initialLoad)
    const dispatch = useDispatch();
    const {companyId} = useContext(UserContext);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const initialValues = {
        project_information: {
            project_name: '',
            project_description: ''
        },
        keys_information: {
            key_type: 'openai',
            key_value: '',
        },
        weight: '',
        dimension: '',
        type_of_cargo: '',
        special_instructions: '',
        shipper_information: {
            company_name: '',
            company_address: '',
            company_phone: '',
            company_email: '',
            extension: '',
            additional_information: ''
        },
        receiver_information: {
            company_name: '',
            company_address: '',
            company_phone: '',
            company_email: '',
            extension: '',
            additional_information: ''
        },
        pick_up_information: {
            location: '',
            date: '',
            special_instructions: '',
            appointment: ''
        },
        drop_off_information: {
            location: '',
            date: '',
            special_instructions: '',
            appointment: ''
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, {
            resetForm
        }) => {
            // addLoad((prevLoad) => ({
            //     ...prevLoad,
            //     cargo_information: [...prevLoad.cargo_information, values],
            // }));
            // console.log(load)
            console.log(values)
            // dispatch somethingg!!

            dispatch(AddProject(values))
            // alert("New Cargo is Added Successfully")

            onClose()
            resetForm(initialValues)
        }
    })

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                boxShadow: '0px 4px 24px rgba(149, 157, 165, 0.2)',
                borderRadius: '15px',
                padding: '30px',
                width: '650px',
                maxHeight: '80vh',
                overflowY: 'auto'
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <div style={{textAlign: 'center', width: '100%', padding: '15px'}}>
                        <Typography variant="h4" gutterBottom>
                            Create Project
                        </Typography>
                    </div>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Stack>
                <form onSubmit={formik.handleSubmit}>

                    <div style={{
                        padding: '4px',
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Project Information
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px',
                            paddingLeft: '20px'
                        }}>
                            <Typography variant="body1">Project Name :</Typography>
                            <TextField
                                name="project_information.project_name"
                                required
                                value={formik.values.project_information.project_name}
                                onChange={formik.handleChange} variant="outlined"/>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px',
                            paddingLeft: '20px'
                        }}>
                            <Typography variant="body1">Project Description:</Typography>
                            <TextField name="project_information.project_description"
                                       required

                                       value={formik.values.project_information.project_description}
                                       onChange={formik.handleChange}
                                       variant="outlined"/>
                        </Box>
                    </div>

                    <Typography variant="h5" gutterBottom>
                        Keys Information
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        paddingLeft: '20px'
                    }}>
                        <Typography variant="body1">Key Type:</Typography>
                        <Select
                            required
                            name="keys_information.key_type"
                            value={formik.values.keys_information.key_type}
                            onChange={formik.handleChange}
                            variant="outlined"
                            style={{minWidth: '200px'}} // Adjust the width as needed
                        >
                            <MenuItem value="openai">OpenAI</MenuItem>
                            <MenuItem value="gemini">Gemini</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        paddingLeft: '20px'
                    }}>
                        <Typography variant="body1">Key Value:</Typography>
                        <TextField name="keys_information.key_value"
                                   value={formik.values.keys_information.key_value}
                                   onChange={formik.handleChange} variant="outlined"/>
                    </Box>

                    <Stack direction="row" spacing={2} my={1}>
                        <Button fullWidth variant="contained" color="primary" type="submit" sx={{m: '10px'}}>
                            Add Project
                        </Button>
                        {/* <LoadingButton variant="contained" color="primary" type="button" fullWidth
                                       onClick={handleSubmit} loading={loading}>
                            Add Project
                        </LoadingButton> */}
                    </Stack>
                    <Modal open={loading} sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                        <CircularProgress/>
                    </Modal>
                </form>
            </div>
        </Modal>
    );
};

AddNewProjectsModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}

export default AddNewProjectsModal;
