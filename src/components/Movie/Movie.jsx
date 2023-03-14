import React from "react";
import { Link } from "react-router-dom";

export default function Movie(props) {
	let { poster_path, title, id, vote_average, overview ,profile_path,popularity,name,media_type} = props.data;
	console.log(props)

	return (
		<div key={id} className="col-md-2">
			<div>
				
				<div className="item position-relative overflow-hidden">
					<img
						src={`https://image.tmdb.org/t/p/w500${poster_path || profile_path}`}
						className="w-100"
						alt=""
					/>
					<Link className="text-light" to={`/details/${id}/${media_type}`}>
                    <div className="overlay d-flex align-items-center text-center">
						<p>{!name? overview.split(' ').slice(0, 10).join(' '): name} </p>
						</div>
						</Link>
                    <div className="vote  p-1">
						<p className="m-0">{!popularity? vote_average.toFixed(1):'' } {popularity? popularity.toFixed(1):''}</p>
                    </div>
				</div>
				
					<h6 className="my-3">{title} {name}</h6>
			</div>
		</div>
	);
}
