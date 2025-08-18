import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { BoldTypo } from 'styled/styled';
import MuiTable from 'misc/MuiTable';
import React, { useState } from 'react';
import { FilterIcon } from 'assets/images/users/Svg';
import { Divider, InputAdornment, MenuItem, TextField } from '@mui/material';
import 'style.css';
// ===============================|| COMPONENT - COLOR ||=============================== //

const headCells = [
    {
        id: 'sno',
        numeric: false,
        disablePadding: true,
        label: 'S.No'
    },
    {
        id: 'cNum',
        numeric: true,
        disablePadding: false,
        label: 'Container No'
    },
    {
        id: 'photo',
        numeric: true,
        disablePadding: false,
        label: 'Photo'
    },
    {
        id: 'invoice',
        disablePadding: false,
        label: 'Invoice'
    },
    {
        id: 'booking',
        disablePadding: false,
        label: 'Booking'
    },
    {
        id: 'departPort',
        disablePadding: false,
        label: 'Departure Port'
    },
    {
        id: 'desPort',
        numeric: true,
        disablePadding: false,
        label: 'Designation Port'
    },
    {
        id: 'date',
        disablePadding: false,
        label: 'Shipping Date'
    },
    {
        id: 'etd',
        disablePadding: false,
        label: 'ETD'
    },
    {
        id: 'eta',
        disablePadding: false,
        label: 'ETA'
    },
    {
        id: 'arrPortDate',
        disablePadding: false,
        label: 'Arrived Port Date'
    },
    {
        id: 'arrStoreDate',
        disablePadding: false,
        label: 'Arrived Store Date'
    },
    {
        id: 'carsAmount',
        disablePadding: false,
        label: 'Cars Shipping Amount'
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'action',
        disablePadding: false,
        label: 'Action'
    }
];
function createData(id, cNum, photo, invoice, booking, departPort, desPort, date, etd, eta, arrPortDate, arrStoreDate, carsAmount, status, action) {
    return {
        id,
        cNum,
        photo,
        invoice,
        booking,
        departPort,
        desPort,
        date,
        etd,
        eta, arrPortDate, arrStoreDate, carsAmount, status, action
    };
}

const rowsData = [
    createData(1, '01', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(2, '02', 'Donut', 2000, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(3, '03', 'Eclair', 2001, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(4, '04', '234234', 2003, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(5, '05', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(6, '06', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(7, '07', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(8, '08', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(9, '09', '234234', 2020, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(10, '10', '234234', 2025, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(11, '11', '234234', 2012, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(12, '12', '234234', 2025, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active'),
    createData(13, '13', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black', 'test', '12/03/2024', '03/03/2024', '1290423', 'Active')
];
export default function ContainersComp() {
    const [state, setState] = useState({
        selected: 'all'
    })
    const [region, setRegion] = React.useState("");
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [dateType, setDateType] = React.useState("");
    const changeSelection = (select) => {
        setState((prevState) => ({ ...prevState, selected: select }));
    }
    const filters = [
        { label: "All", count: 372, color: "#FDEDEC", active: true },
        { label: "In Shipping", count: 69, color: "#FFF4E5", active: false },
        { label: "Arrived Port", count: 0, color: "#EDF7ED", active: false },
        { label: "Arrived Store", count: 32, color: "#FDEDEC", active: false },
        { label: "Delivered", count: 271, color: "#EAF4FE", active: false },
    ];

    const regions = ["All Regions", "Region 1", "Region 2", "Region 3"];
    const dateTypes = ["Shipment Date", "Delivery Date", "Order Date"];
    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
                <Stack justifyContent={'space-between'} flexDirection={'row'}>
                    <Typography sx={{ fontWeight: 300, fontSize: '30px', color: '#09090B' }}>
                        Containers
                        <Breadcrumbs navigation={navigation} title="Users" />
                    </Typography>
                </Stack>
                <MainCard
                    sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    content={false}
                >
                    <BoldTypo sx={{ fontSize: '18px', fontWeight: 500, color: '#101828' }}>All Filters</BoldTypo>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container xs={12} md={12} lg={12} gap={3} alignItems={'center'} sx={{ mb: 3 }}>
                        {filters.map((filter) => (
                            <Stack
                                key={filter.label}
                                flexDirection={'row'}
                                alignItems="center"
                                gap={2}
                            >
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: "14px", color: "#000", borderBottom: filter.active ? "4px solid orange" : "none", }}
                                >
                                    {filter.label}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#FA5A7D',
                                        mt: '4px',
                                        width: '57px',
                                        height: '30px',
                                        padding: '4px 10px 4px 10px',
                                        borderRadius: '16px',
                                        background: '#FFEDF0',
                                        textAlign: "center"

                                    }}
                                >
                                    {filter.count}
                                </Typography>
                            </Stack>
                        ))}
                    </Grid>
                    <Grid container xs={12} md={12} lg={12} sx={{ mb: 3 }} gap={1}>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('picked')}>
                            <TextField
                                variant="outlined"
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('way')}>
                            <TextField
                                fullWidth
                                select
                                label="All Regions"
                                defaultValue={'All Regions'}
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            >
                                {regions.map((region) => (
                                    <MenuItem key={region} value={region}>
                                        {region}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('hand')} >
                            <TextField
                                fullWidth
                                type='date'
                                label="From Date"
                                value={fromDate}
                                onChange={(date) => setFromDate(date)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('hand')} >
                            <TextField
                                fullWidth
                                type='date'
                                label="To Date"
                                value={fromDate}
                                onChange={(date) => setFromDate(date)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('manifest')}>
                            <TextField
                                fullWidth
                                select
                                label="Date Type"
                                defaultValue={dateTypes[0]}
                                value={dateType}
                                onChange={(e) => setDateType(e.target.value)}
                            >
                                {dateTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>
                </MainCard>
                <MainCard
                    sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    content={false}
                >
                    <MuiTable name={'Containers'} column={headCells} rows={rowsData} />
                </MainCard>
            </Grid>
        </>
    );
}
