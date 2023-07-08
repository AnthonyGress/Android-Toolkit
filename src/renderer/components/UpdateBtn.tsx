import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { Box, Typography } from '@mui/material';
import { ShellCommand } from '../types';

interface Props {
    shellCommand: ShellCommand
}

export const UpdateBtn = ({ shellCommand }: Props) => {
    const handleUpdate = () => {
        shellCommand('update');
    };

    return (
        <Box className="center" mb={2} onClick={handleUpdate} sx={{ cursor: 'pointer' }}>
            <ArrowCircleDownOutlinedIcon className='bounce'/>
            <Typography fontSize={18} ml={1}>Update Available</Typography>
        </Box>
    );
};

