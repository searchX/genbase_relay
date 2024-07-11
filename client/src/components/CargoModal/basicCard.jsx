// import * as React from 'react';
import React, {useState} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import {Collapse} from "@mui/material";
import {CargoTable} from "./CargoTable";


export default function BasicCard({

                                      index,
                                      id,
                                      load_id,
                                      company_id,
                                      weight,
                                      dimension,
                                      type_of_cargo,
                                      special_instructions,
                                      shipper_information,
                                      receiver_information,
                                      pickUp_information,
                                      dropOff_information,
                                  }) {
    const [opened, setOpen] = useState(null);
    return (
        <Card key={index} sx={{
            minWidth: 275,
            cursor: 'pointer',
        }} onClick={() => setOpen((v) => !v)}>
            <CardContent>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>

                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Cargo {index + 1}
                    </Typography>
                    <Box sx={{
                        padding: '5px 10px',
                        bgcolor: '#ffb1b1',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography sx={{fontSize: 12}} color="text.secondary">
                            {type_of_cargo}
                        </Typography>

                    </Box>

                </Stack>
                <Typography sx={{mb: 1.2, fontSize: 12}} color="text.secondary">
                    Dimension: {dimension}, Weight: {weight}
                </Typography>
                {!opened && <div style={{display: 'flex', position: 'relative'}}>
                    <Box>
                        <Typography>{pickUp_information.date}</Typography>
                        <Typography>{dropOff_information.date}</Typography>
                    </Box>
                    <Box sx={{
                        width: '2px',
                        bgcolor: 'black',
                        position: 'relative',
                        margin: '0 20px',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            width: '10px',
                            height: '10px',
                            bgcolor: 'black',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '10%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        },
                        '&:after': {
                            content: '""',
                            display: 'block',
                            width: '10px',
                            height: '10px',
                            bgcolor: 'black',
                            borderRadius: '50%',
                            position: 'absolute',
                            bottom: '0%',
                            left: '50%',
                            transform: 'translate(-50%, -00%)'
                        }
                    }}/>
                    <div>
                        <Typography>{pickUp_information.location}</Typography>
                        <Typography>{dropOff_information.location} </Typography>
                    </div>
                </div>}
                <TableRow>
                    <Collapse in={opened} timeout="auto" unmountOnExit>
                        <CargoTable heading='Shipper Information' data={[
                            {label: 'Company Name', value: shipper_information.company_name},
                            {label: 'Number', value: shipper_information.company_phone},
                            {label: 'Email', value: shipper_information.company_email},
                            {label: 'Extension', value: shipper_information.extension},
                            {label: 'Additional Information', value: shipper_information.additional_information},
                            {label: 'Address', value: shipper_information.company_address},
                        ]}/>
                        <CargoTable heading='Receiver Information' data={[
                            {label: 'Company Name', value: receiver_information.company_name},
                            {label: 'Number', value: receiver_information.company_phone},
                            {label: 'Email', value: receiver_information.company_email},
                            {label: 'Extension', value: receiver_information.extension},
                            {label: 'Additional Information', value: receiver_information.additional_information},
                            {label: 'Address', value: receiver_information.company_address},
                        ]}/>
                        <CargoTable heading='PickUp Information' data={[
                            {label: 'Location', value: pickUp_information.location},
                            {label: 'Date', value: pickUp_information.date},
                            {label: 'Special Instructions', value: pickUp_information.special_instructions},
                            {label: 'Appointments', value: pickUp_information.appointment},
                        ]}/>
                        <CargoTable heading='DropOff Information' data={[
                            {label: 'Location', value: pickUp_information.location},
                            {label: 'Date', value: pickUp_information.date},
                            {label: 'Special Instructions', value: pickUp_information.special_instructions},
                            {label: 'Appointments', value: pickUp_information.appointment},
                        ]}/>


                    </Collapse>
                </TableRow>
            </CardContent>
        </Card>
    );
}

// Define propTypes
BasicCard.propTypes = {
    index: PropTypes.number.isRequired, // Define prop type for index
    id: PropTypes.any,
    load_id: PropTypes.any,
    company_id: PropTypes.any,
    weight: PropTypes.any,
    dimension: PropTypes.any,
    type_of_cargo: PropTypes.any,
    special_instructions: PropTypes.any,
    shipper_information: PropTypes.any,
    receiver_information: PropTypes.any,
    pickUp_information: PropTypes.any,
    dropOff_information: PropTypes.any,
};
