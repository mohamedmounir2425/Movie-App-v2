import axios from "axios"


export let getMovies = async (mediaType) => {
    
    let { data }  = await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/day?api_key=364d5c60ab33326723502b1a258dcb4a')
    return data.results
  }
  

  export let getData = async (id,mediaType) => {
    // let {data} = await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=364d5c60ab33326723502b1a258dcb4a') 
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=364d5c60ab33326723502b1a258dcb4a`) 
     return data
    // setMoviedetails(data.results)

}


export let axiosPost = async(endPoint,formData) => {
  
  let {data} = await axios.post(`https://route-movies-api.vercel.app/${endPoint}`, formData)
  return data
}

