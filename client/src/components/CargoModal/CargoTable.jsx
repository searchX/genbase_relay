import {TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import PropTypes from 'prop-types'; // Import PropTypes

export const CargoTable = ({
                               heading,
                               data
                           }) => 
     (
        <Table sx={{
            mt: 2
        }} size="small" aria-label="purchases">
            <TableBody>
                <Typography variant='h6'>{heading} </Typography>
                {
                    data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {item.label}:
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.value} </TableCell>
                        </TableRow>))
                }

            </TableBody>
        </Table>
        )

// Define propTypes
CargoTable.propTypes = {
    heading: PropTypes.string.isRequired, // Define prop type for heading
    data: PropTypes.arrayOf(PropTypes.shape({ // Define prop type for data
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    })).isRequired
};
