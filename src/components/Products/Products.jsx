import React, { Component } from 'react'

export default class Products extends Component {

  movies = [
    {id:1,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/1.jpg'},
    {id:2,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/2.jpg'},
    {id:3,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/3.jpg'},
    {id:4,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/4.jpg'},
    {id:5,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/5.jpg'},
    {id:6,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/6.jpg'},
    {id:7,name:'tom & jerry', desc:'tom and jerry tom and jerry' , imgUrl:'images/7.jpg'},
  ]
  render() {
    return (
        <div className='container my-5'>
        <div className="row">
          {this.movies.map((value, index) => {
            return (
              <div className="col-md-3" key={value.id}>
                <div className="item">
                  <img src={value.imgUrl} className='w-100 imgHight ' alt="" />
                  <h2>{ value.name}</h2>
                  <p>{ value.desc}</p>

                </div>
              </div>
            )
          })}
            </div>
      </div>
    )
  }
}
