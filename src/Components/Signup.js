import * as React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
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
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { database, storage } from '../firebase';
// import { updateDoc, serverTimestamp } from "firebase/firestore";


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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const handleClick = async () => {
        if (file == null) {
            setError("Please upload profile image first");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }

        try {
            setError('')
            setLoading(true)
            let userObj = await signup(email, password);
            let uid = userObj.user.uid
            console.log(uid);

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);

            // fn1 -> progress, fn2 -> error, fn3 -> success
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`, snapshot.bytesTransferred, snapshot.totalBytes)
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000)
                setLoading(false)
                return;
            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                    // console.log(uid, name, url);
                })
                setLoading(false);
                navigate('/'); 
            }

        } catch (err) {
            setError(err);
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

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
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' value={name} onChange={(e) => setName(e.target.value)} />
                        <Button size="small" color="secondary" fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon />} component='label'>
                            Upload Profile Image
                            <input type="file" accept='image/' hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant='contained' disabled={loading} onClick={handleClick}>
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
                                Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Log-In</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>

            </div>
        </div>
    );
}
