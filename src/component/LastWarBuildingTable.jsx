import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const LastWarBuildingTable = ({data, useRequirement = false}) => {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Iron</TableCell>
                        <TableCell>Food</TableCell>
                        <TableCell>Gold</TableCell>
                        <TableCell>Time</TableCell>
                        {useRequirement && <>
                            <TableCell>요구사항1</TableCell>
                            <TableCell>요구사항2</TableCell>
                        </>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.level}</TableCell>
                            <TableCell>{item.iron}</TableCell>
                            <TableCell>{item.food}</TableCell>
                            <TableCell>{item.gold}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            {useRequirement &&
                                <>
                                    <TableCell>{item.requirement1}</TableCell>
                                    <TableCell>{item.requirement2}</TableCell>
                                </>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default LastWarBuildingTable;