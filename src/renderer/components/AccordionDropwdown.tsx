import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    title: string,
    children?: React.ReactNode,
    defaultExpanded?: boolean
}

export const AccordionDropdown = ({
    title,
    children,
    defaultExpanded=false
}: Props) => {
    return (
        <Box className='vcenter' mt={2}>
            <Accordion defaultExpanded={defaultExpanded} className='transparent-bg' sx={{ width: '64vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px'
                    }}

                >
                    <Typography fontSize={18}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

