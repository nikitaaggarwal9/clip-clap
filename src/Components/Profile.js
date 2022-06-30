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
  const [comments, setComments] = useState(null)
  const [userData, setUserData] = useState(null)
  const [posts, setPosts] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [likes, setLikes] = useState(0)

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
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
    database.users.doc(id).onSnapshot((snap) => {
      setUserData(snap.data())

    })
  }, [id])

  useEffect(() => {
    setPostDataForProfile();
  }, [userData])

  async function setPostDataForProfile() {
    if (userData != null) {
      let parr = []
      for (let i = 0; i < userData.postIds.length; i++) {
        let postData = await database.posts.doc(userData.postIds[i]).get()
        parr.push({ ...postData.data(), postId: userData.postIds[i] })
      }
      // console.log(parr)
      setPosts(parr);
    }
  }

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
                  <img src={userData.profileUrl} />
                </div>
                <div className="info">
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {userData.fullname}
                  </Typography>
                  <Typography variant='h6'>
                    Posts: {posts == null ? '0' : userData.postIds.length}
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
                            <video src={post.pUrl} onClick={() => { handleClickOpen(post.pId); updateComments(post) }} />
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
                                    <Comments comments={comments} postData={post}></Comments>
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
            </div>
          </>
      }
    </>
  )
}

export default Profile