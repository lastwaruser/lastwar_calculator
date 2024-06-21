import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const LastWarRadioGroup = ({options, onChange, value}) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl>
            <RadioGroup row value={value} onChange={handleChange}>
                {
                    options.map((option) => (
                        <FormControlLabel key={option.value} value={option.value} control={<Radio/>}
                                          label={option.label}/>
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
};

export default LastWarRadioGroup;