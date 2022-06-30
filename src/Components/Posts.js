import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import './Posts.css'
import Video from './Video'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import Like2 from './Like2'
import AddComment from './AddComment'
import Comments from './Comments'
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom'


function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = useState(null)
    const [likes, setLikes] = useState(0)
    const navigate = useNavigate();

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handlePostAdminProfileClick = (uid, puid) => {
        // console.log(uid, puid)
        navigate(`/profile/${uid}/${puid}`)
    };

    async function updateComments(data) {
        let arr = []
        for (let i = data.comments.length - 1; i >= 0; i--) {
            let data1 = await database.comments.doc(data.comments[i]).get();
            arr.push(data1.data())
        }
        // console.log(arr)
        setComments(arr)
    }

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub;
    }, [])


    // work for autoplaying video on scrolling using API 

    const callback = (enteries) => {
        enteries.forEach(entry => {
            let ele = entry.target.childNodes[0];
            ele.play().then(() => {
                if (!ele.paused && !entry.isIntersecting) {
                    ele.pause();
                }
            })
        })
    }

    let observer = new IntersectionObserver(callback, { threshold: 0.6 });

    useEffect(() => {
        const elements = document.querySelectorAll(".videos");
        elements.forEach(element => {
            observer.observe(element);
        })

        return () => {
            observer.disconnect();
        }

    }, [posts])

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
                                            <Avatar src={post.uProfile} />
                                            <h4 onClick={() => handlePostAdminProfileClick(userData.userId, post.userId)} style={{cursor:'pointer'}}>{post.userName} </h4>
                                        </div>
                                        <Like userData={userData} postData={post} setLikes={setLikes} likes={likes}></Like>
                                        <CommentIcon className='comment-icon' onClick={() => { handleClickOpen(post.pId);updateComments(post)}} style={{cursor:'pointer'}}></CommentIcon>
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
                                                        <Comments postData={post} comments={comments}></Comments>
                                                    </div>

                                                    <div className='card2' >
                                                        {/* variant='outlined' style={{ maxWidth: 345, height: 99.68 }}> */}
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 postData={post} userData={userData} setLikes={setLikes} likes={likes} style={{ display: 'flex', justifyContent: 'center' }}></Like2>
                                                            <div variant='body1' style={{ width: 290, paddingTop: '.5rem' }}>
                                                                {post.likes.length === 0 ? '' : post.likes.length === 1 ? `Appreciated By 1 user` : `Appreciated By ${post.likes.length} users`}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <AddComment userData={userData} setComments={setComments} comments={comments} postData={post}></AddComment>
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