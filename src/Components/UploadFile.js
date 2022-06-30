import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid'
import { database, storage } from '../firebase';

function UploadFile(props) {
    // console.log(props.user)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleChange = async (file) => {
        if (file == null) {
            setError("Please select a file first!");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }

        if (file.size / (1024 * 1024) > 100) {
            setError("This video is very big!");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }

        let uid = uuidv4()
        setLoading(true);

        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);

        // fn1 -> progress, fn2 -> error, fn3 -> success
        uploadTask.on('state_changed', fn1, fn2, fn3);

        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress} done.`, snapshot.bytesTransferred, snapshot.totalBytes)
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
                // console.log(url, props.user);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    userName: props.user.fullname,
                    uProfile: props.user.profileUrl,
                    userId: props.user.userId,
                    createdAt: database.getTimeStamp()
                }
                database.posts.add(obj).then(async ref => {
                    let res = await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds !== undefined ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(() => {
                    setLoading(false)
                }).catch((err) => {
                    // console.log(err.message);
                    setError(err)
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                    setLoading(false)
                })
            })
            setLoading(false);
            // navigate('/');
        }
    }
    return (
        <div style={{marginTop:'5rem', marginBottom:'1rem'}}>
            {
                error !== '' ? <Alert severity="error">{error}</Alert> :
                    <>
                        <input type="file" accept="video/" onChange={(e) => handleChange(e.target.files[0])} id='upload-input' style={{ display: 'none' }} />
                        <label htmlFor="upload-input">
                            <Button
                                variant="outlined"
                                color="secondary"
                                component="span"
                                disabled={loading}
                            >
                                <MovieIcon></MovieIcon><span>&nbsp;&nbsp;</span>
                                Upload video
                            </Button>
                            {loading && <LinearProgress color='secondary' style={{ marginTop: '3%' }}></LinearProgress>}
                        </label>

                    </>
            }
        </div>
    )
}

export default UploadFile