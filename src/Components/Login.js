import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Login.css'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import insta_logo from '../Assets/insta-logo.png'
import mobile_slider from '../Assets/mobile_slider.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import img1 from '../Assets/img1.png'
import img2 from '../Assets/img2.png'
import img3 from '../Assets/img3.png'
import img4 from '../Assets/img4.png'
 

export default function Signup() {
    const store = useContext(AuthContext);
    // console.log(store);
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            textAlign: 'center'
        },
        card2: {
            height: '6.5vh',
            marginTop: '1%'
        }
    })

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async() => {
        try{
            setError('');
            setLoading(true);
            let res = await login(email, password);
            setLoading(false);
            navigate('/');
        } catch(err) {
            setError(err);
            setTimeout(()=>{
                setError('');
            }, 2000);
            setLoading(false);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="img-car" style={{ backgroundImage: 'url(' + mobile_slider + ')', backgroundSize: 'cover' }}>
                <div className="car">
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={4}
                        naturalSlideWidth={246}
                        naturalSlideHeight={515}
                        // hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><img src={img1}></img></Slide>
                            <Slide index={1}><img src={img2}></img></Slide>
                            <Slide index={2}><img src={img3}></img></Slide>
                            <Slide index={3}><img src={img4}></img></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>

            <div className="login-card">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={insta_logo} alt="" />
                    </div>
                    <CardContent>
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Typography className={classes.text2} color='primary' variant="subtitle1">
                            Forgot Password?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant='contained' onClick={handleClick} disabled={loading}>
                            Sign In
                        </Button>
                    </CardActions>
                    <Card variant='outlined' className={classes.card2}>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign-In</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>

            </div>
        </div>
    );
}
