import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import { CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography';
import Navbar from './Navbar'
import './Profile.css'
import Like2 from './Like2'
import AddComment from './AddComment'
import Comments from './Comments'
import Dialog from '@mui/material/Dialog';


function Profile() {
    const { id } = useParams()
    const { id2 } = useParams()
    const [userData, setUserData] = useState(null)
    const [otherUserData, setOtherUserData] = useState(null)
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = useState(null);
    const [likes, setLikes] = useState(0);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    async function updateComments(idx) {
        let arr = []
        for (let i = posts[idx].comments.length - 1; i >= 0; i--) {
            let data = await database.comments.doc(posts[idx].comments[i]).get();
            arr.push(data.data())
        }
        // console.log(arr);
        setComments(arr)
    }

    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id])

    useEffect(() => {
        let otherData = null;
        database.users.doc(id2).onSnapshot((snap) => {
            otherData = snap.data();
            setPostDataForProfile();
            setOtherUserData(snap.data())
        })
        async function setPostDataForProfile() {
            // console.log(otherData)
            if (otherData != null) {
                let parr = []
                for (let i = 0; i < otherData.postIds.length; i++) {
                    let postData = await database.posts.doc(otherData.postIds[i]).get()

                    parr.push({ ...postData.data(), postId: otherData.postIds[i] })
                }
                // console.log(parr);
                setPosts(parr);
            }
        }

    }, [id2])

    return (
        // <div>Hello {id}</div>
        <>
            {
                userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className="upper-part">
                                <div className="profile-img">
                                    {/* {console.log(otherUserData)} */}
                                    <img src={otherUserData.profileUrl} />
                                </div>
                                <div className="info">
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                        {otherUserData.fullname}
                                    </Typography>
                                    <Typography variant='h6'>
                                        Posts: {posts == null ? '0' : otherUserData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                            {
                                posts == null ? <></> :
                                    <div className="profile-videos">
                                        {
                                            posts.map((post, index) => (
                                                < React.Fragment key={index} >
                                                    <div className='videos'>
                                                        <video src={post.pUrl} onClick={() => { handleClickOpen(post.pId); updateComments(index) }} />
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
                                                                        <Comments postData={post} comments={comments} index={index} ></Comments>
                                                                    </div>

                                                                    <div className='card2' >
                                                                        {/* variant='outlined' style={{ maxWidth: 345, height: 99.68 }}> */}
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Like2 postData={post} userData={userData} setLikes={setLikes} likes={likes} style={{ display: 'flex', justifyContent: 'center' }}></Like2>
                                                                            <div variant='body1' style={{ width: 290, paddingTop: '.5rem' }}>
                                                                                {likes === 0 ? '' : likes === 1 ? `Appreciated By 1 user` : `Appreciated By ${likes} users`}
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <AddComment comments={comments} setComments={setComments} userData={userData} postData={post} index={index} ></AddComment>
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
                        </div>
                    </>
            }
        </>
    )
}

export default Profile