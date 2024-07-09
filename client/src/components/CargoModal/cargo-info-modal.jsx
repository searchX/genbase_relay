import {Box, Modal, Typography} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import BasicCard from './basicCard';
import {Link} from "react-router-dom";


const CargoInfoModal = ({
                            open, close, cargoInfo, documents
                        }) => (
    <Modal open={open} onClose={close}>
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'WHITE',
            boxShadow: '0px 4px 24px rgba(149, 157, 165, 0.2)',
            borderRadius: '15px',
            padding: '30px',
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
        }
        }
        >
            <Typography variant="h4" sx={{marginBottom: '20px'}}>Cargo</Typography>
            {
                cargoInfo.map((item, index) => (
                    <BasicCard index={index} {...item}
                               dropOff_information={item.drop_off_information}
                               pickUp_information={item.pick_up_information}/>
                ))
            }
            <Typography variant="h6" sx={{marginBottom: '20px'}}>Load Documents</Typography>
            {
                documents != null ? documents.map((v) => <Link to={v}>{v.split('/')[6]}</Link>) :
                    <Typography variant="body" sx={{marginBottom: '20px'}}>No Documents</Typography>
            }
        </Box>
    </Modal>
);

CargoInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    cargoInfo: PropTypes.arrayOf(
        PropTypes.object // Validate that cargoInfo is an array of objects
    ).isRequired,
    documents: PropTypes.any
};


export default CargoInfoModal;