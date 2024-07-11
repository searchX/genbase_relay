import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {useContext, useState} from 'react';
import AppWidgetSummary from '../app-widget-summary';
// for the graphs
import {UserContext} from '../../../context/UserContext';
import ProjectView from '../../active-loads/active-loads-view';
import TutorialView from '../../project-tutorial/project-tutorial-view';
import {useSelector} from 'react-redux';
import SvgColor from '../../../components/svg-color';
import {styled} from '@mui/system';
import Box from '@mui/material/Box';

const StyledCard = styled(Box)(({theme}) => ({
    width: 60,
    height: 60,
    background: 'rgba(208,210,209,0.29)',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function AppView() {

    const [selectedProjectId, setSelectedProjectId] = useState('<project_key>');

    const {companyId} = useContext(UserContext);
    const projects = useSelector((state) => state.projects.projects);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{mb: 5}}>
                Hi, Welcome to the Genbase 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Projects"
                        total={projects.length ? projects.length : []}
                        color="success"
                        icon={
                            <StyledCard>
                                <SvgColor sx={{
                                    background: 'rgba(243,64,97,0.96)',
                                    width: 32,
                                    height: 32,
                                }} src="assets/icons/glass/ic--baseline-outbox.svg"/>
                            </StyledCard>
                        }
                    />

                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total API Calls"
                        total="-"
                        color="info"
                        icon={
                            <StyledCard>
                                <SvgColor sx={{
                                    background: 'rgba(243,64,97,0.96)',
                                    width: 32,
                                    height: 32,
                                }} src="assets/icons/glass/streamline--database-server-1-solid.svg"/>
                            </StyledCard>}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Sessions"
                        total="-"
                        color="warning"
                        icon={<StyledCard>
                            <SvgColor sx={{
                                background: 'rgba(243,64,97,0.96)',
                                width: 32,
                                height: 32,
                            }} src="assets/icons/glass/hugeicons--user-group.svg"/>
                        </StyledCard>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Approx Tokens"
                        total="-"
                        color="error"
                        icon={<StyledCard>
                            <SvgColor sx={{
                                background: 'rgba(243,64,97,0.96)',
                                width: 32,
                                height: 32,
                            }} src="assets/icons/glass/material-symbols--token-rounded.svg"/>
                        </StyledCard>}
                    />
                </Grid>
                {/*
        <Grid xs={12} md={6} lg={8}>

          <Paper style={{padding:'20px'}}>
          <Typography variant="h6" component="h2">
            Income vs Expense
            </Typography>
          
        <BarChart
          xAxis={[{ label:'Load Number', scaleType: 'band', data: AllIncomeExpense.map(item => item.load_number)}]}
          series={[{ label: 'Total Rate' ,data: AllIncomeExpense.map(item => item.total_rate) }, { label:'Total Expense',data:AllIncomeExpense.map(item => item.total_expense || 0) }]}
          width={500}
          height={440}
        />
        </Paper>
        </Grid> */}


                {/* TODO Graph: Expense Analysis (Aggreation of Amount)   */}
                {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Total Expenses"
            chart={{
              series: Array.isArray(AllExpenseAmountAnalysis) ? AllExpenseAmountAnalysis.map((item) => ({
                label: item.table_name,

                value: item.total_expense === null ? 0 : item.total_expense,
              })) : [],
            }}
          />
        </Grid> */}

                <ProjectView setProjectId={setSelectedProjectId}/>
                <TutorialView project_id={selectedProjectId}/>

            </Grid>
        </Container>
    );
}
