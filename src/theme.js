import { createTheme } from '@mui/material/styles';


// we are overriding the default values 
export default createTheme({
    palette: {
        background: {
            default: '#F1F3F4',
        },
        primary: {
            main: "#FF855C",
        },
        pink : 'linear-gradient(138.72deg, #6EB392 0%, #6FB492 95.83%)'
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
        h4: {
            fontWeight: 800
        },
        h5: {
            fontWeight: 800
        },
        subtitle1: {
            fontWeight: 800
        }
    },
    mixins: {
        centerBlockStyle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }
    }
})