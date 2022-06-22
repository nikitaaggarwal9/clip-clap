import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video'
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
                // console.log(data);
            })
            setPosts(parr)
            // console.log(posts)
            // console.log(userData);
            // console.log(unsub);
        })
        return unsub;
    }, [])
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => (
                                < React.Fragment key={index} >
                                    <div className='videos'>
                                        {/* console.log(post.pUrl) */}
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profileUrl} />
                                            <h4 >{userData.fullname}</h4>
                                        </div>
                                        <Like userData={userData} postData={post}></Like>
                                        <CommentIcon className='comment-icon' onClick={() => handleClickOpen(post.pId)}></CommentIcon>
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    {/* <Video src={post.pUrl} className="modal-video"/> */}
                                                    <video src={post.pUrl} muted='muted' autoPlay={true} controls ></video>
                                                </div>
                                                <div className="comment-modal">
                                                    <Card sx={{ maxWidth: 345 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                component="img"
                                                                height="140"
                                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                                alt="green iguana"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    Lizard
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                    species, ranging across all continents except Antarctica
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="primary">
                                                                Share
                                                            </Button>
                                                        </CardActions>
                                                    </Card>

                                                    <Card variant='outlined'>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {post.likes.length == 0 ? '' : `Liked By ${post.liked.length} users`}
                                                        </Typography>
                                                        <div>
                                                            like2
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                </React.Fragment>

                            ))
                        }
                    </div>
            }
        </div >
    )
}

export default Posts