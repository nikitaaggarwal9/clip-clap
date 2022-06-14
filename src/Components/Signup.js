import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Signup.css'
import Alert from '@mui/material/Alert';
import insta_logo from '../Assets/insta-logo.png'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'


export default function Signup() {
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '6.5vh',
            marginTop: '1%'
        }
    })

    const classes = useStyles();

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={insta_logo} alt="" />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see photos and videos from your friends
                        </Typography>
                        {true && <Alert severity="error">Email already in use!</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <Button size="small" color="secondary" fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon />} component='label'>
                            Upload Profile Image
                            <input type="file" accept='image/' hidden />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant='contained'>
                            Sign In
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            By Singing up, you agree to Terms, Conditions and Cookies Policy.
                        </Typography>
                    </CardContent>
                    <Card variant='outlined' className={classes.card2}>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                Already have an account? <Link to="/login" style={{textDecoration:'none'}}>Log-In</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>

            </div>
        </div>
    );
}
