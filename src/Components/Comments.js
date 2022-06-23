import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase'


function Comments({ postData }) {
    const [comments, setComments] = useState(null)
    useEffect(() => {
        async function updateComments() {
            let arr = []
            for (let i = postData.comments.length - 1; i >= 0; i--) {
                let data = await database.comments.doc(postData.comments[i]).get();
                arr.push(data.data())
            }
            setComments(arr)
        }
        updateComments()
    }, [postData])
    return (
        <div>
            {
                comments == null ? <div style={{display: 'flex', justifyContent:'center'}}><CircularProgress /></div> :
                    <>
                        {
                            comments.map((comment, index) => (
                                index === comments.length - 1 ?
                                    <div style={{ display: 'flex', border: '.3px solid lightgray' }}>
                                        <Avatar style={{ margin: '.5rem' }} src={comment.uProfileImage} />
                                        <p>&nbsp;&nbsp;<sapn style={{ fontWeight: 'bold' }}>{comment.uName}</sapn>&nbsp;&nbsp; {comment.text}</p>
                                    </div>
                                    :
                                    <div style={{ display: 'flex', border: '.3px solid lightgray', borderBottom:'none' }}>
                                        <Avatar style={{ margin: '.5rem' }} src={comment.uProfileImage} />
                                        <p>&nbsp;&nbsp;<sapn style={{ fontWeight: 'bold' }}>{comment.uName}</sapn>&nbsp;&nbsp; {comment.text}</p>
                                    </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default Comments