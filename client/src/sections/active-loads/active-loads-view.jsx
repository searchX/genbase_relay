import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {useDispatch, useSelector} from 'react-redux';
import TableNoData from '../../components/table/table-no-data';
import ProjectTableRow from './active-load-table-row';
import UserTableHead from '../../components/table/user-table-head';
import TableEmptyRows from '../../components/table/table-empty-rows';
import {applyFilter, emptyRows, getComparator} from '../../components/table/utils';
import AddNewProjectsModal from './add-load-modal';
import {getprojectsLoaded} from '../../redux/actions/actions';
import PropTypes from 'prop-types';

export default function ProjectView({setProjectId}) {

    const projectsLoaded = useSelector((state) => state.projects.projects);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState(-1);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getprojectsLoaded());
    }, [dispatch]);


    const handleSelectAllClick = (event) => {
        setSelected(-1);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const dataFiltered = applyFilter({
        inputData: projectsLoaded,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const handleClick = (event, index) => {
        // Get that projectid data
        setProjectId(dataFiltered[index].project_key);
        setSelected(index);
    };


    const notFound = !dataFiltered.length && !!filterName;
    return (
        <Container maxWidth>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h3">Projects</Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}
                            onClick={handleOpenModal}>
                        Create
                    </Button>
                    <AddNewProjectsModal open={isModalOpen} onClose={handleCloseModal}/>
                </Stack>
            </Stack>
            <Card>

                <Scrollbar>
                    <TableContainer sx={{overflow: 'unset'}}>
                        <Table sx={{minWidth: 800}}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={projectsLoaded.length}
                                numSelected={selected === -1 ? 0 : 1}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    {id: 'index', label: 'S.No'},
                                    {id: 'loadNumber', label: 'Project Name'},
                                    {id: 'totalSession', label: 'Total Sessions'},
                                    {id: 'projectKey', label: 'Project Key'},
                                    {id: 'createdAt', label: 'Created At'},
                                ]}
                            />

                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <ProjectTableRow
                                            key={page * rowsPerPage + index}
                                            i={page * rowsPerPage + index}
                                            id={row.id}
                                            selected={selected === index}
                                            handleClick={(event) => handleClick(event, index)}
                                            {...row}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, projectsLoaded.length)}
                                />

                                {notFound && <TableNoData query={filterName}/>}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Scrollbar>
                <TablePagination
                    page={page}
                    component="div"
                    count={projectsLoaded.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}

ProjectView.propTypes = {
    setProjectId: PropTypes.func,
};