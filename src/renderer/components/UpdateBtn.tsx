import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { Box, Typography } from '@mui/material';
import { shellCommand } from '../api';

export const UpdateBtn = () => {

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

