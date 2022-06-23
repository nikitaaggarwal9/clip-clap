import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video'
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import Like2 from './Like2'
import AddComment from './AddComment'
import Comments from './Comments'
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@mui/material/Dialog';


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
                                            open={open === post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video src={post.pUrl} muted='muted' autoPlay={true} controls ></video>
                                                </div>

                                                <div className="comment-modal">
                                                    <div className='card1' >
                                                        <Comments postData={post}></Comments>
                                                    </div>

                                                    <div className='card2' > 
                                                    {/* variant='outlined' style={{ maxWidth: 345, height: 99.68 }}> */}
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 postData={post} userData={userData} style={{ display: 'flex', justifyContent: 'center' }}></Like2>
                                                            <div variant='body1' style={{ width: 290, paddingTop: '.5rem' }}>
                                                                {post.likes.length === 0 ? '' : `Appreciated By ${post.likes.length} user(s)`}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <AddComment userData={userData} postData={post}></AddComment>
                                                        </div>
                                                    </div>
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