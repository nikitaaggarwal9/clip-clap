import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import Avatar from '@mui/material/Avatar';


// const useStyles = makeStyles({
//     appb: {
//         background: 'purple'
//     }
// })

export default function Navbar({ userData }) {
    // console.log(userData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();
    const { logout } = React.useContext(AuthContext);
    // const classes = useStyles()

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        navigate(`/profile/${userData?.userId}`)
    };

    const handleBannerClick = () => {
        navigate('/')
    };

    const handleExplore = () => {
        let newWindow = window.open('https://www.google.com/');
        newWindow.focus();
    };

    const handleLogout = async () => {
        await logout();
        navigate(`/login`)
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
            <MenuItem onClick={handleLogout}><ExitToAppIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
            <MenuItem onClick={handleLogout}><ExitToAppIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>

        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"  sx={{backgroundColor: 'purple'}}>
            {/* className={classes.appb} */}  
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <span>&nbsp;<FontAwesomeIcon icon={faClapperboard} />&nbsp;&nbsp;</span>
                        Clip-Clap
                        <span>&nbsp;<FontAwesomeIcon icon={faHandsClapping} style={{ fontSize: '1.6rem' }} /></span>

                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <FontAwesomeIcon icon={faHouse} onClick={handleBannerClick} style={{ fontSize: '1.3rem', padding: '1rem', cursor: 'pointer' }} />
                        <FontAwesomeIcon icon={faCompass} onClick={handleExplore} style={{ fontSize: '1.3rem', padding: '1rem', cursor: 'pointer' }} />
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={userData?.profileUrl} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
