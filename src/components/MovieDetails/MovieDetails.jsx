import { async } from 'q';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getData } from '../Api/Api'
import Loading from '../Loading/Loading';
export default function MovieDetails() {


    let { id , media } = useParams(); 
    
    let [Movies,setMovies] = useState('')
  
    
    let getMovies = async () => {
      let movies = await getData(id,media)
      setMovies(movies) 
  }
    

    useEffect(() => {
        getMovies()
    },[])
    
  
    return (
      <>
        {Movies ? (
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500${
                    Movies.poster_path || Movies.profile_path
                  }`}
                  alt=""
                />
              </div>
              <div className="col-md-7 ">
                <h2 className="mt-5 mb-4">
                  {Movies.title} {Movies.name}
                </h2>
                <p className="secondColor">{Movies.tagline}</p>
                {/* {Movies.genres?Movies.genres.map((value, index) => {
                            return <span className='badge bg-info p-2 mx-2 my-2'>{value.name }</span>
                        }): Movies.genres_ids.map((value, index) => {
                            return <span className='badge bg-info p-2 mx-2 my-2'>{value.name }</span>
                        }) } */}
                <ul className="list">
                  <li>
                    {Movies.vote_average ? (
                      <div className="text-white fw-normal fs-5">
                        Vote :
                        <span className="secondColor fw-normal fs-6">
                          {" "}
                          {Movies.vote_average}
                        </span>
                      </div>
                    ) : (
                      <div className="text-white fw-normal fs-5">
                        Name :
                        <span className="secondColor fw-normal fs-6">
                          {" "}
                          {Movies.name}
                        </span>
                      </div>
                    )}
                  </li>
                  <li>
                    {Movies.vote_count ? (
                      <div className="text-white fw-normal fs-5">
                        Vote Count :
                        <span className="secondColor fw-normal fs-6">
                          {" "}
                          {Movies.vote_count}
                        </span>
                      </div>
                    ) : (
                      <div className="text-white fw-normal fs-5">
                        known for department :
                        <span className="secondColor fw-normal fs-6">
                          {" "}
                          {Movies.known_for_department}
                        </span>
                      </div>
                    )}
                  </li>
                  <li className="text-white fw-normal fs-5">
                    Popularity :{" "}
                    <span className="secondColor fw-normal fs-6">
                      {" "}
                      {Movies.popularity}
                    </span>
                  </li>
                  <li>
                    {Movies.release_date ? (
                      <div className="text-white fw-normal fs-5">
                        release date :
                        <span className="secondColor fw-normal fs-6">
                          {" "}
                          {Movies.release_date}
                        </span>
                      </div>
                    ) : (
                      ``
                    )}
                  </li>
                </ul>
               {Movies.overview ?  <div className="colorOverview fw-semibold fs-3">
                  overview :
                  <p className="secondColor fw-normal fs-6">
                    {Movies.overview}
                  </p>
                </div>:''}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
}
