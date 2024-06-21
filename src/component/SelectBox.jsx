import PropTypes from 'prop-types'
import {useCallback, useState} from "react";
import Select from "react-select";

const SelectBox = ({options, onSelect}) => {
    const [selectedOption, setSelectedOption] = useState(options.length > 0 ? options[0] : null)

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db', // Tailwind blue-500 or gray-300
            '&:hover': {
                borderColor: state.isFocused ? '#2563eb' : '#9ca3af', // Tailwind blue-600 or gray-400
            },
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none', // Tailwind blue-500
            borderRadius: '0.375rem', // Tailwind rounded-md
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#bfdbfe' : '#ffffff', // Tailwind blue-500, blue-100, white
            color: state.isSelected ? '#ffffff' : '#111827', // Tailwind white or gray-900
            '&:hover': {
                backgroundColor: state.isSelected ? '#2563eb' : '#bfdbfe', // Tailwind blue-600 or blue-100
                color: '#111827', // Tailwind gray-900
            },
            padding: '0.5rem', // Tailwind p-2
        }),
    };


    const handleChange = useCallback((option) => {
        setSelectedOption(option)
        onSelect(option)
    }, [onSelect, setSelectedOption])

    return (
        <Select value={selectedOption}
                options={options}
                onChange={handleChange}
                styles={customStyles}
        />
    )
}

SelectBox.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default SelectBox