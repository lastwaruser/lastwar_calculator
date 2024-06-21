import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {DecimalNumberInput} from "../component/CustomNumberInput";
import LastWarRadioGroup from "../component/LastWarRadioGroup";

const Calculator = () => {
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [percent, setPercent] = useState(0);
    const [oneHour, setOneHour] = useState(0);
    const [eightHour, setEightHour] = useState(0);
    const [threeHour, setThreeHour] = useState(0);
    const [oneMinute, setOneMinute] = useState(0);
    const [fiveMinute, setFiveMinute] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalAcceleratorSeconds, setTotalAcceleratorSeconds] = useState(0);
    const [selectedFirstOption, setSelectedFirstOption] = useState('');
    const [selectedSecondOption, setSelectedSecondOption] = useState('50');

    const timeFormat = (totalSecond) => {
        const newDays = Math.floor(totalSecond / (24 * 60 * 60));
        const remainingSecondsAfterDays = totalSecond % (24 * 60 * 60);
        const newHours = Math.floor(remainingSecondsAfterDays / (60 * 60));
        const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60);
        const newMinutes = Math.floor(remainingSecondsAfterHours / 60);
        const newSeconds = Math.round(remainingSecondsAfterHours % 60);

        return `${newDays}일 ${newHours}시간 ${newMinutes}분 ${newSeconds}초`;
    };

    const newTotalMinutesStr = useMemo(() => {
        const totalInitialSeconds = (day * 24 * 60 * 60) + (hour * 60 * 60) + (minute * 60);

        let optionPercent = 0;
        if (selectedFirstOption !== '') {
            optionPercent = parseInt(selectedSecondOption);
        }

        let inputPercent = parseInt(percent);
        if (!percent || percent === 0) {
            inputPercent = 0;
        }

        const increaseRate = optionPercent + inputPercent === 0 ? 0 : (optionPercent + inputPercent) / 100;
        const newTotalSeconds = totalInitialSeconds / (1 + increaseRate);
        setTotalSeconds(newTotalSeconds);
        return timeFormat(newTotalSeconds);
    }, [day, hour, minute, percent, selectedFirstOption, selectedSecondOption]);

    const timeWithAccelerator = useMemo(() => {
        const totalAcceleratorSeconds =
            (eightHour * 8 * 60 * 60) + (threeHour * 3 * 60 * 60) + (oneHour * 60 * 60)
            + (fiveMinute * 5 * 60) + (oneMinute * 60);
        setTotalAcceleratorSeconds(totalAcceleratorSeconds);

        return timeFormat(totalAcceleratorSeconds);
    }, [eightHour, fiveMinute, oneHour, oneMinute, threeHour]);

    const remainTime = useMemo(() => {
        const result = totalSeconds - totalAcceleratorSeconds;

        if (result < 0) {
            return 0;
        }

        return timeFormat(result);
    }, [totalAcceleratorSeconds, totalSeconds]);

    const options = [
        {value: '', label: '없음'},
        {value: 'build', label: '건설장관'},
        {value: 'tech', label: '과학부장'},
    ];

    const options2 = useMemo(() => {
        if (selectedFirstOption === 'build') {
            return [
                {value: '50', label: '건설 50%'},
                {value: '25', label: '테크 25%'},
            ]
        }
        return [
            {value: '50', label: '테크 50%'},
            {value: '25', label: '건설 25%'},
        ]
    }, [selectedFirstOption]);

    const handleRadio1 = useCallback((value) => {
        setSelectedFirstOption(value);
    }, [setSelectedFirstOption]);

    const handleRadio2 = useCallback((value) => {
        setSelectedSecondOption(value);
    }, [setSelectedSecondOption]);

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
                            <Typography color="text.secondary"> 소요시간</Typography>
                            <Typography color="text.secondary" sx={{fontSize: '10px'}}>건물 레벨 업 또는
                                연구 버튼에 나오는
                                시간은 감소 된 시간이므로 증가율 입력은 불필요.</Typography>
                            <Typography color="text.secondary" sx={{fontSize: '10px'}}>장관 버프 받기 전에 장관 버프 적용 된
                                시간을 알고 싶을 경우 하단에서 장관 종류 선택.</Typography>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 일: </Typography>
                            <DecimalNumberInput onChange={setDay}/>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 시간: </Typography>
                            <DecimalNumberInput onChange={setHour}/>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 분: </Typography>
                            <DecimalNumberInput onChange={setMinute}/>
                            <Box m={1}/>
                            <Typography color="text.secondary" sx={{pb: 1}}> 증가율 % (본진 - 통계 - 경제) </Typography>
                            <DecimalNumberInput onChange={setPercent}/>
                            <LastWarRadioGroup value={selectedFirstOption} options={options} onChange={handleRadio1}/>
                            {(selectedFirstOption && selectedFirstOption !== '') &&
                                <LastWarRadioGroup value={selectedSecondOption} options={options2}
                                                   onChange={handleRadio2}/>}
                            <Typography sx={{pb: 1, color: 'red'}}>예상시간 : {newTotalMinutesStr}</Typography>
                            <Box m={1}/>
                            <Typography color="text.secondary"> 가속아이템 </Typography>
                            <Typography color="text.secondary"> 8시간 </Typography>
                            <DecimalNumberInput onChange={setEightHour}/>
                            <Typography color="text.secondary"> 3시간 </Typography>
                            <DecimalNumberInput onChange={setThreeHour}/>
                            <Typography color="text.secondary"> 1시간 </Typography>
                            <DecimalNumberInput onChange={setOneHour}/>
                            <Typography color="text.secondary"> 5분 </Typography>
                            <DecimalNumberInput onChange={setFiveMinute}/>
                            <Typography color="text.secondary"> 1분 </Typography>
                            <DecimalNumberInput onChange={setOneMinute}/>
                            <Typography sx={{pb: 1, color: 'red'}}>가속기 총 시간 : {timeWithAccelerator}</Typography>
                            <Typography color={'secondary'}>남은 시간 : {remainTime}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Calculator;