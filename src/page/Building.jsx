import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SelectBox from "../component/SelectBox";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {headQuarters} from "../js/HeadQuarters";
import {techCenter} from "../js/TechCenter";
import {tankCenter} from "../js/TankCenter";
import {drillGround} from "../js/DrillGround";
import {barrack} from "../js/Barrack";
import {allianceCenter} from "../js/AllianceCenter";
import {hospital} from "../js/Hospital";
import {wall} from "../js/Wall";
import {DecimalNumberInput} from "../component/CustomNumberInput";
import LastWarBuildingTable from "../component/LastWarBuildingTable";

const Building = () => {
    const selectOptions = useMemo(() => [
        {value: 'headQuarters', label: '본부', file: headQuarters, useRequirement: true},
        {value: 'techCenter', label: '테크센터', file: techCenter, useRequirement: false},
        {value: 'tankCenter', label: '탱크센터', file: tankCenter, useRequirement: false},
        {value: 'barrack', label: '병영', file: barrack, useRequirement: false},
        {value: 'drillGround', label: '연병장', file: drillGround, useRequirement: false},
        {value: 'allianceCenter', label: '연맹센터', file: allianceCenter, useRequirement: false},
        {value: 'hospital', label: '병원', file: hospital, useRequirement: false},
        {value: 'wall', label: '배리어', file: wall, useRequirement: false},
    ], []);

    const levelOptions = [
        {value: "Lv. 10>11", label: 'Lv. 10>11'},
        {value: "Lv. 11>12", label: 'Lv. 11>12'},
        {value: "Lv. 12>13", label: 'Lv. 12>13'},
        {value: "Lv. 13>14", label: 'Lv. 13>14'},
        {value: "Lv. 14>15", label: 'Lv. 14>15'},
        {value: "Lv. 15>16", label: 'Lv. 15>16'},
        {value: "Lv. 16>17", label: 'Lv. 16>17'},
        {value: "Lv. 17>18", label: 'Lv. 17>18'},
        {value: "Lv. 18>19", label: 'Lv. 18>19'},
        {value: "Lv. 19>20", label: 'Lv. 19>20'},
        {value: "Lv. 20>21", label: 'Lv. 20>21'},
        {value: "Lv. 21>22", label: 'Lv. 21>22'},
        {value: "Lv. 22>23", label: 'Lv. 22>23'},
        {value: "Lv. 23>24", label: 'Lv. 23>24'},
        {value: "Lv. 24>25", label: 'Lv. 24>25'},
        {value: "Lv. 25>26", label: 'Lv. 25>26'},
        {value: "Lv. 26>27", label: 'Lv. 26>27'},
        {value: "Lv. 27>28", label: 'Lv. 27>28'},
        {value: "Lv. 28>29", label: 'Lv. 28>29'},
        {value: "Lv. 29>30", label: 'Lv. 29>30'},
    ]

    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
    const [selectedLevel, setSelectedLevel] = useState(levelOptions[0].value);
    const [techPercent, setTechPercent] = useState(0);
    const [resourcePercent, setResourcePercent] = useState(0);

    const handleBuildingSelect = useCallback((value) => {
        const option = selectOptions.filter(option => option === value)[0];
        setSelectedOption(option);
    }, [selectOptions]);

    const handleLevel = useCallback(({value}) => {
        setSelectedLevel(value)
    }, [setSelectedLevel]);

    const selectedInformation = useMemo(() => {
        return selectedOption.file
            .filter(item => item.level === selectedLevel)[0]
    }, [selectedLevel, selectedOption.file]);

    const time = useMemo(() => {
        const originalTime = selectedInformation.time;

        if (!techPercent || techPercent === 0) {
            return originalTime;
        }

        const convertTime = parseFloat(originalTime);

        if (originalTime.endsWith('h')) {
            return (convertTime / (1 + (techPercent / 100))).toFixed(2) + 'h';
        }

        if (originalTime.endsWith('d')) {
            return (convertTime / (1 + (techPercent / 100))).toFixed(2) + 'd';
        }

        return originalTime;
    }, [techPercent, selectedInformation]);

    const calculateWithResourcePercent = useCallback((value) => {
        if (!resourcePercent || resourcePercent === 0) {
            return value;
        }

        const convertResource = parseFloat(value);

        if (value.endsWith('K')) {
            return (convertResource * (100 - resourcePercent) / 100).toFixed(2) + "K";
        }

        if (value.endsWith('M')) {
            return (convertResource * (100 - resourcePercent) / 100).toFixed(2) + "K";
        }

        return value;
    }, [resourcePercent]);

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography color="text.secondary" sx={{pb: 1}}> 건물: </Typography>
                            <SelectBox options={selectOptions} onSelect={handleBuildingSelect}/>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 원하는 레벨: </Typography>
                            <SelectBox options={levelOptions} onSelect={handleLevel}/>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 증가율: </Typography>
                            <DecimalNumberInput onChange={setTechPercent}/>
                            <Typography color="text.secondary" variant={'overline'} sx={{pb: 1}}>속도 증가율은 본진 - 통계 - 경제에서
                                확인 가능</Typography>
                            <Typography color="text.secondary" sx={{pb: 1}}> 자원 감소율: </Typography>
                            <DecimalNumberInput onChange={setResourcePercent}/>
                            <Typography color="text.secondary" variant={'overline'} sx={{pb: 1}}>자원 감소율은 본진 - 통계 - 경제에서
                                확인 가능</Typography>
                            <Typography sx={{pb: 1, color: 'red'}}>예상시간 : {time}</Typography>
                            <Typography color="secondary" sx={{pb: 1}}>철
                                : {calculateWithResourcePercent(selectedInformation.iron)}</Typography>
                            <Typography color="secondary" sx={{pb: 1}}>식량
                                : {calculateWithResourcePercent(selectedInformation.food)}</Typography>
                            <Typography color="secondary" sx={{pb: 1}}>금
                                : {calculateWithResourcePercent(selectedInformation.gold)}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <LastWarBuildingTable data={selectedOption.file}
                                                  useRequirement={selectedOption.useRequirement}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Building;