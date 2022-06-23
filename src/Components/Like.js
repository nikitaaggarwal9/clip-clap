import React, { useEffect, useState } from 'react'
// import ClapButton from 'react-clap-button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'


function Like({ userData, postData }) {
    const [like, setLike] = useState(true);
    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true : false
        setLike(check)
    }, [postData])
    const handleLike = () => {
        if(like==true) {
            let narr = postData.likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        } else {
            let narr = [...postData.likes, userData.userId]
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    }
    return (
        <div>
            {
                like != null ?
                    <>
                        {
                            like == true ? <FontAwesomeIcon icon={faHandsClapping} className={'icon-styling like'} onClick={handleLike}/>:<FontAwesomeIcon icon={faHandsClapping} className={'icon-styling unlike'} onClick={handleLike}/>
                        }
                    </> :
                    <></>
             }
        </div>
    )
}

export default Like