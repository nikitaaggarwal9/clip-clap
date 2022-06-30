import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'

function Like2({ userData, postData, likes, setLikes }) {
    const [like, setLike] = useState(true);
    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true : false
        setLike(check)
        setLikes(postData.likes.length)
    }, [postData])
    const handleLike = () => {
        // console.log(like);
        if(like==true) {
            let narr = postData.likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes: narr
            })
            setLike(false)
            setLikes(narr.length)
        } else {
            let narr = [...postData.likes, userData.userId]
            // console.log(narr);
            database.posts.doc(postData.postId).update({
                likes: narr
            })
            setLike(true)
            setLikes(narr.length )
        }
    }
    return (
        <div>
            {
                like != null ?
                    <>
                        {
                            like == true ? <FontAwesomeIcon icon={faHandsClapping} style={{padding:'.5rem', fontSize:'1.6rem'}} className={'like'} onClick={handleLike}/>:<FontAwesomeIcon icon={faHandsClapping} style={{padding:'.5rem', fontSize:'1.6rem'}} className={'unlike2'} onClick={handleLike}/>
                        }
                    </> :
                    <></>
             }
        </div>
    )
}

export default Like2