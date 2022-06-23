import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../firebase'

function AddComment({ userData, postData }) {
    const [text, setText] = useState('');
    const handleClick = () => {
        console.log(userData)
        let obj = {
            text: text,
            uProfileImage: userData.profileUrl,
            uName: userData.fullname
        }
        database.comments.add(obj).then((doc) => {
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })
        })
        setText('')
    }
    return (
        <div>
            <TextField sx={{ width: 300 }} id="outlined-basic" label="Comment" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleClick} sx={{ height: 55 }} variant="contained">Post</Button>
        </div>
    )
}

export default AddComment