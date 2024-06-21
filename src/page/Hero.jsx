import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import {useMemo, useState} from "react";
import SelectBox from "../component/SelectBox";
import {experience} from "../js/HeroExperience";
import Typography from "@mui/material/Typography";
import {NumberInputIntroduction} from "../component/CustomNumberInput";


const Hero = () => {
    const levelOptions = Array(150).fill().map((_, index) => ({
        value: index + 1,
        label: index + 1 + 'Lv'
    }));

    const [currentLevel, setCurrentLevel] = useState(levelOptions[0]);
    const [targetLevel, setTargetLevel] = useState(levelOptions[0]);
    const [vsHeroPoint, setVSHeroPoint] = useState(0);
    const [totalExperience, setTotalExperience] = useState(0);


    const totalExp = useMemo(() => {
        if (currentLevel.value >= targetLevel.value) {
            return 0;
        }

        let totalExp = 0;

        for (let level = currentLevel.value + 1; level <= targetLevel.value; level++) {
            totalExp += experience[level];
        }

        setTotalExperience(totalExp);
        if (totalExp >= 1_000_000) {
            return (totalExp / 1_000_000).toFixed(1) + 'M'
        } else if (totalExp >= 1_000) {
            return (totalExp / 1_000).toFixed(1) + 'K';
        }

        return totalExp;
    }, [currentLevel.value, targetLevel.value]);

    const vsPoint = useMemo(() => {
        if (vsHeroPoint === 0 || !vsHeroPoint) {
            return 0;
        }
        let formatter = new Intl.NumberFormat('en-US');
        const result = Math.floor(totalExperience / 660) * vsHeroPoint;
        return formatter.format(result);
    }, [vsHeroPoint, totalExperience]);

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
                            <Typography color="text.secondary">
                                현재 레벨
                            </Typography>
                            <SelectBox options={levelOptions} onSelect={setCurrentLevel}/>
                            <Typography color="text.secondary">
                                희망 레벨
                            </Typography>
                            <SelectBox options={levelOptions} onSelect={setTargetLevel}/>
                            <Typography component="h2" color="primary" gutterBottom>필요 경험치: {totalExp}</Typography>
                            <Typography color="text.secondary">
                                660점 경험치 소모 점수
                            </Typography>
                            <NumberInputIntroduction
                                min={0}
                                max={2}
                                onChange={(e, newValue) => setVSHeroPoint(newValue)}/>
                            <Typography component="h2" color="primary" gutterBottom>
                                점수: {vsPoint}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

export default Hero;