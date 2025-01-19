
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DatePickerProps {
    selectedDate: Date | null;
    handleChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, handleChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker className='date-picker'
                label="Select a Date"
                value={selectedDate}
                onChange={(newDate: Date | null) => handleChange(newDate)}
                sx={{
                    '& .MuiInputLabel-root': {
                        color: 'white', // Change label color to white
                    },
                    '& .MuiOutlinedInput-root': {
                        color: 'white', // Change text color inside the input
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Change border color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white', // Change calendar icon color
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;