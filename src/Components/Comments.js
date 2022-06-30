import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase'
import { useNavigate } from 'react-router-dom'


function Comments({ postData, comments, updateComments }) {
    //const [comments, setComments] = useState(null);
    const navigate = useNavigate();
    const handlePostAdminProfileClick = (id) => {
        console.log(id)
        navigate(`/profile/${id}`)
    };
    // console.log("REndering commnets");
    // console.log(comments);
    useEffect(() => {
        // async function updateComments() {
        //     let arr = []
        //     for (let i = postData.comments.length - 1; i >= 0; i--) {
        //         let data = await database.comments.doc(postData.comments[i]).get();
        //         arr.push(data.data())
        //     }
        //     console.log(arr)
        //     setComments(arr)
        // }
        // updateComments(postData);
    }, [postData])
    return (
        <div>
            {
                comments == null ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div> :
                    <>
                        {
                            comments.map((comment, index) => (
                                <div key={index} style={{ display: 'flex', borderBottom: '.3px solid lightgray' }}>
                                    <Avatar style={{ margin: '.5rem' }} src={comment.uProfileImage} />
                                    <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handlePostAdminProfileClick(comment.uId)}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                                </div>

                            ))
                        }
                    </>
            }
        </div>
    )
}

export default Comments