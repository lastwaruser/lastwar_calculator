import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";

const Main = () => {
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
                            <Typography color="primary">
                                제작자: #496 OVK 바밤 바
                            </Typography>
                            <Box m={1}/>
                            <Typography>
                                #496 서버의 OVK 맹원 분들께 조금이나마 도움이 될 것 같아서 만들었습니다.
                            </Typography>
                            <Typography>
                                게임 패치 또는 개발상의 버그로 오차가 발생 할 수 있으니 참고 용도로 사용 해주세요.
                                기능은 계속해서 추가 하도록 하겠습니다.
                            </Typography>
                            <Typography>
                                건물 데이터는 #82 유므유 님 자료를 참조하였습니다.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Main;