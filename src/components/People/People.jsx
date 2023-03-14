import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Offline } from 'react-detect-offline'
import Disconnected from '../Disconnected/Disconnected'
import Loading from '../Loading/Loading'

export default function People() {

  
  let [People,setPeople] = useState([])
    let getMovies = async(mediaType ,setitem) => {
      let { data }  = await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/day?api_key=364d5c60ab33326723502b1a258dcb4a')
      setitem(data.results)
    }
    
    
    useEffect(() => {
      getMovies('person',setPeople)
    },[])
  



  return (
    <>
      
    
    {People.length>0 ? <div className="container">
    <div className="row my-5">
      
    {People.map((People, index) => 	<div key={People.id} className="col-md-2">
			<div>
				<div className="item position-relative overflow-hidden">
					<img
						src={`https://image.tmdb.org/t/p/w500${People.profile_path}`}
						className="w-100"
						alt=""
                    />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <p>{ People.name}</p>
                    </div>
                    <div className="vote p-2">
                       { People.popularity.toFixed(1)}
                    </div>
				</div>
					<h6 className="my-3">{People.name}</h6>
			</div>
		</div>)}
 </div>
</div>:<Loading/>}
    
    </>
  )
}
