import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//import comp
import CryptoDetails from "./CryptoDetails"

export default function ResponsiveDialog({ cryptoName, cryptoSymbol }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" color="inherit"sx={{color: 'white',}} onClick={handleClickOpen}>
                {cryptoName}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent sx={{ maxWidth: 1200, minWidth: 900, bgcolor: "#14171b", color: "white" }}>
                    <CryptoDetails cryptoSymbol={cryptoSymbol} />
                </DialogContent>
            </Dialog>
        </div>
    );
}