import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { addfeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCard from './userCard'
import axios from 'axios'

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector((store)=> store.feed);
    console.log(feedData,"ffrfr")
    const navigate = useNavigate();

    const fetchFeed = async ()=> {
        try{

            if(feedData) return;

        const res = await axios.get(BASE_URL+"/user/feed", {withCredentials : true});
        console.log(res)

        dispatch(addfeed(res?.data?.data));
        

        } catch(err){
            console.log(err);
        }

    }

    useEffect(()=> {
    fetchFeed();
    },[])

    if (!feedData) return;

  if (feedData.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
   feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    )
  )
}

export default Feed