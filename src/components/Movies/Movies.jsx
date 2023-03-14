
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Offline } from 'react-detect-offline'
import { getMovies } from '../Api/Api'
import Disconnected from '../Disconnected/Disconnected'
import Loading from '../Loading/Loading'
import Movie from '../Movie/Movie'

export default function Movies() {


  let [Movies,setMovies] = useState([])
  
    
    let getData = async () => {
      let movies = await getMovies('movie')
      setMovies(movies) 
  }
    
    useEffect(() => {
      getData()
    },[])
  
    
  return (
    <>
     
      
    {Movies.length>0? <div className="container">
            <div className="row my-5">
              
           {Movies.map((movie, index) => <Movie data={ movie} />)}
         </div>
      </div>:<Loading/>}
    
    </>
  )
}
