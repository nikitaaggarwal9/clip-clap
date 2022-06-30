import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../firebase'

function AddComment({ userData, postData, setComments,comments }) {
    const [text, setText] = useState('');
    const handleClick = () => {
        // console.log(userData)
        let obj = {
            text: text,
            uProfileImage: userData.profileUrl,
            uName: userData.fullname,
            uId: userData.userId
        }
        // console.log(obj)
        database.comments.add(obj).then((doc) => {
            // console.log(doc.id, postData)
            // console.log(postData.comments)
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })
            if (setComments !== undefined && comments!=undefined)
                setComments([obj,...comments])
        })

        setText('')
    }
    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center'}} >
            <TextField style={{width:'80%', height:'99%'}} id="outlined-basic" label="Comment" variant="filled" value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleClick} style={{width:'20%', height:'100%'}} variant="contained">Post</Button>
        </div>
    )
}
// sx={{ width: 300 }}
// sx={{ height: 55 }}
// style={{width:'100%'}}

export default AddComment