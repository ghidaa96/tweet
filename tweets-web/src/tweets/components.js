import React, { useEffect, useState } from 'react'

import { loadTweet } from '../lookup'
export function TweetsList(props) {
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setTweets(response)
            }

        }
        loadTweet(myCallback)
    }, [])

    return tweets.map((item, index) => {
        return <Tweet tweet={item} key={index} className="my-5 py-5 border bg-white text-dark" />
    })
}
export function ActionBtn(props) {
    const { tweet, action } = props;
    const [likes,setLikes] = useState(tweet.like ? tweet.like:0)
    const [userLike,setUserLike]=useState(tweet.userLike ===true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDiaplay = action.display ? action.display:'Action'
    
    const handelClick =(event) => {
        event.preventDefault();
        if(action.type=== 'like'){
            if(userLike===true){
                setLikes(likes -1)
                setUserLike(false)
            }else{
                setLikes(likes+1)
                setUserLike(true)
            }
            
        }
    }
    const display = action.type ==="like" ?`${likes} ${actionDiaplay}`:actionDiaplay
    return  <button class={className} onClick={handelClick}> {display}</button> 
}
export function Tweet(props) {
    const { tweet } = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{tweet.id}-{tweet.content}</p>
        <div className="btn btn-group">
            <ActionBtn tweet={tweet} action={{ type: 'like', display:'Likes' }} />
            <ActionBtn tweet={tweet} action={{ type: 'unlike', display:'unLike'  }} />
            <ActionBtn tweet={tweet} action={{ type: 'retweet', display:'Retweet'  }} />
        </div>
    </div>
}