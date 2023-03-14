import axios from 'axios'
import { async } from 'q'
import React, { useEffect, useState } from 'react'
import { Offline } from 'react-detect-offline'
import { getMovies } from '../Api/Api'
import Disconnected from '../Disconnected/Disconnected'
import Loading from '../Loading/Loading'
import Movie from '../Movie/Movie'

export default function Home() {

let [Movies,setMovies] = useState([])
let [Tv,setTv] = useState([])
let [People,setPeople] = useState([])

  
  let getData = async () => {
    let movies = await getMovies('movie')
    let tv = await getMovies('tv')
    let person = await getMovies('person')
    setMovies(movies) 
    setTv(tv)
    setPeople(person)
}
  
  useEffect(() => {
    getData()
  },[])


  return (
    <>
     
      
      {Movies.length>0 ? <div className="container">
            <div className="row my-5">
              <div className="col-md-4  ">
                <div className="item">
                  <div className="brdr w-25 mb-4" ></div>
                <h2 className='fw-bold'>Trending <br />Movies <br />to Watch now </h2>
                  <h5  className='secondColor mt-4'>Most watched movies by days</h5>
                  <div className="brdr w-100 mt-4"></div>
                </div>
              </div>
            {Movies.slice(0, 10).map((value, index) => <Movie key={value.id} data={ value} />)}
          </div>
        

        <div className="row my-5">
             <div className="col-md-4  ">
               <div className="item">
                 <div className="brdr w-25 mb-4" ></div>
               <h2 className='fw-bold'>Trending <br />TV <br />to Watch now</h2>
                 <h5  className='secondColor mt-4'>Most watched movies by days</h5>
                 <div className="brdr w-100 mt-4"></div>
               </div>
             </div>
             {Tv.slice(0, 10).map((value, index) => <Movie key={value.id} data={ value} />)}
        </div>


        <div className="row my-5">
             <div className="col-md-4  ">
               <div className="item">
                 <div className="brdr w-25 mb-4" ></div>
               <h2 className='fw-bold'>Trending <br />People <br />to Watch now</h2>
                 <h5  className='secondColor mt-4'>Most watched movies by days</h5>
                 <div className="brdr w-100 mt-4"></div>
               </div>
             </div>
             {People.slice(0, 10).map((value, index) => <Movie key={value.id} data={ value} />)}
        </div>
     

          </div>:<Loading/>}
    </>
  )
}
