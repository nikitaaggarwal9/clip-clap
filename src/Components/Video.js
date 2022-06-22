import React from 'react'
import ReactDOM from 'react-dom'
import './Video.css'

function Video(props) {

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll = (e) => {
        let nextVideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if (nextVideo) {
            nextVideo.scrollIntoView();
            e.target.muted = true;
        }
    }

    return (
        <video src={props.src} onEnded={handleScroll} className='videos-styling' muted='muted' onClick={handleClick}>
        </video>
    )
}

export default Video