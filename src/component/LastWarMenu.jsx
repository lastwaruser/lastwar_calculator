import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from "@mui/icons-material/People";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalculateIcon from '@mui/icons-material/Calculate';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import * as React from "react";
import {useCallback} from "react";
import {List} from "@mui/material";
import Divider from "@mui/material/Divider";

const LastWarMenu = ({onClickMenu}) => {
    const handleMenuClick = useCallback((value) => {
        console.log(value)
        onClickMenu && onClickMenu(value)
    }, [onClickMenu]);

    return (
        <List>
            <ListItemButton onClick={() => handleMenuClick('main')}>
                <ListItemIcon>
                    <WysiwygIcon/>
                </ListItemIcon>
                <ListItemText primary="설명"/>
            </ListItemButton>
            <Divider sx={{my: 1}}/>
            <ListSubheader component="div" inset>
                계산기
            </ListSubheader>
            <ListItemButton onClick={() => handleMenuClick('hero')}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="영웅"/>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick('building')}>
                <ListItemIcon>
                    <ApartmentIcon/>
                </ListItemIcon>
                <ListItemText primary="건물"/>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick('calculator')}>
                <ListItemIcon>
                    <CalculateIcon/>
                </ListItemIcon>
                <ListItemText primary="직접계산"/>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick('drone')}>
                <ListItemIcon>
                    <PrecisionManufacturingIcon/>
                </ListItemIcon>
                <ListItemText primary="드론"/>
            </ListItemButton>
        </List>
    );
}

export default LastWarMenu;