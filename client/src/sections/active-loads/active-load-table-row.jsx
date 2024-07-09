import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function ProjectTableRow({ i, id, selected, handleClick, name, description, project_key, created_at }) {
  return (
    <>
      <TableRow sx={{
        cursor:'pointer'
      }} hover onClick={handleClick} tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell align="center">
          {i + 1}
        </TableCell>
        {/* <TableCell onClick={() => setOpen((v) => !v)}>{loadNumber}</TableCell> */}
        {/* <TableCell onClick={() => setOpen((v) => !v)} align="center">{rate}</TableCell> */}
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell component="th" scope="row">
          -
        </TableCell>
        <TableCell component="th" scope="row">
          {project_key}
        </TableCell>
        <TableCell>
          {created_at}
        </TableCell>
      </TableRow>
    </>
  );
}

// export default function ProjectTableRow({
//                                                selected,
//                                                i,
//                                                id,
//                                                loadNumber,
//                                                rate,
//                                            }) {
//     const trailers = useSelector((state) => state.trailer.trailers);
//     const trucks = useSelector((state) => state.truck.trucks);
//     const drivers = useSelector((state) => state.driver.drivers);
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const [assignedDriver, setAssignedDriver] = useState([]);
//     const [assignedTrucks, setAssignedTrucks] = useState('');
//     const [assignedTrailer, setAssignedTrailer] = useState('');
//     const [open, setOpen] = useState(null);
//     const handleInProgressLoad = useCallback(async () => {
//         if (assignedDriver.length === 0) {
//             alert('Please select a driver');
//         } else if (assignedTrucks === '') {
//             alert('Please select a truck');
//         } else if (assignedTrailer === '') {
//             alert('Please select a trailer');
//         } else {
//             setLoading(true);
//             const data = {
//                 "load_id": id,
//                 "assigned_driver": assignedDriver.map((driver) => ({driver_id: driver})),
//                 "assigned_truck": assignedTrucks,
//                 "assigned_trailer": assignedTrailer
//             }
//             await setToProgressLoads(data);
//             // dispatch(addAssignedLoads({id, assignedDriver, truck_id: assignedTrucks, trailer_id: assignedTrailer}));
//             // dispatch(updateprojectsLoaded(id));
//             // assignedDriver.map((driver) => dispatch(addAssignedDriver({
//             //     driver_id: driver,
//             //     load_id: id,
//             // })));
//             setLoading(false);
//             setAssignedTrucks('');
//             setAssignedTrailer('');
//             setAssignedDriver([]);
//         }
//     }, [assignedDriver, assignedTrucks, assignedTrailer, id, dispatch]);

//     const ITEM_HEIGHT = 48;
//     const ITEM_PADDING_TOP = 8;
//     const MenuProps = {
//         PaperProps: {
//             style: {
//                 maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//                 width: 250,
//             },
//         },
//     };
//     const handleChange = (event) => {
//         const {
//             target: {value},
//         } = event;
//         setAssignedDriver(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//     };
//     const COLUMN_WIDTH = 150;
//     return (
//         <>
//             <Modal open={loading}>
//                 <CircularProgress sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                 }}/>
//             </Modal>
//             <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

//                 <TableCell align='center' onClick={() => setOpen((v) => !v)}>
//                     {i + 1}
//                 </TableCell>
//                 <TableCell onClick={() => setOpen((v) => !v)}>{loadNumber}</TableCell>
//                 <TableCell onClick={() => setOpen((v) => !v)} align="center">{rate}</TableCell>
//                 <TableCell component="th" scope="row">
//                     <FormControl fullWidth sx={{
//                         width: COLUMN_WIDTH,
//                     }}>
//                         <InputLabel id="assigned-driver-checkbox-label">Assign Driver</InputLabel>
//                         <Select fullWidth
//                                 unselectable="on"
//                                 multiple
//                                 labelId="assigned-driver-checkbox-label"
//                                 id="assigned-driver-checkbox"
//                                 MenuProps={MenuProps}
//                                 renderValue={(_selected) => (
//                                     <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
//                                         {
//                                             drivers.filter((value) => _selected.indexOf(value.driver_id) > -1).map((value, index) =>
//                                                 <Chip key={index} label={value.driver_name}/>
//                                             )}
//                                     </Box>
//                                 )}
//                                 value={assignedDriver}
//                                 onChange={handleChange}
//                                 placeholder="Assign Driver"
//                         >
//                             {
//                                 drivers.map((value, index) => (
//                                     <MenuItem key={index} value={value.driver_id}>
//                                         <Checkbox checked={assignedDriver.indexOf(value.driver_id) > -1}/>
//                                         <ListItemText primary={value.driver_name}/>
//                                     </MenuItem>
//                                 ))
//                             }
//                         </Select>
//                     </FormControl>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     <FormControl fullWidth sx={{
//                         width: COLUMN_WIDTH,
//                     }}>
//                         <InputLabel id="assigned-truck-label">Assigned Truck</InputLabel>
//                         <Select
//                             labelId='assigned-truck-label'
//                             fullWidth
//                             value={assignedTrucks}
//                             onChange={(e) => {
//                                 setAssignedTrucks(e.target.value);
//                             }}>
//                             {
//                                 trucks.map((value, index) => (
//                                     <MenuItem key={index} value={value.id}>
//                                         {value.license_plate}</MenuItem>
//                                 ))
//                             }
//                         </Select>
//                     </FormControl>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     <FormControl fullWidth sx={{
//                         width: COLUMN_WIDTH,
//                     }}>
//                         <InputLabel id="assigned-trailer-label">Assigned Trailer</InputLabel>
//                         <Select fullWidth
//                                 labelId='assigned-trailer-label'
//                                 value={assignedTrailer}
//                                 onChange={(e) => {
//                                     setAssignedTrailer(e.target.value);
//                                 }}
//                         >
//                             {
//                                 trailers.map((value, index) => (
//                                     <MenuItem key={index} value={value.id}>{value.license_plate}</MenuItem>
//                                 ))
//                             }
//                         </Select>
//                     </FormControl>
//                 </TableCell>
//                 <TableCell>
//                     {
//                         assignedDriver.length > 0 && assignedTrailer && assignedTrucks &&
//                         <Button variant='outlined' onClick={handleInProgressLoad}>In Progress</Button>

//                     }
//                 </TableCell>
//             </TableRow>
//             {/* <CargoInfoModal open={open} close={() => setOpen(false)} cargoInfo={cargoInfo}/> */}
//         </>
//     );
// }

ProjectTableRow.propTypes = {
  i: PropTypes.any,
  id: PropTypes.any,
  selected: PropTypes.any,
  handleClick: PropTypes.any,
  created_at: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  project_key: PropTypes.string,
};
