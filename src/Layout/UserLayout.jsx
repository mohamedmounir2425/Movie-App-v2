import React, { Component } from 'react'
import { Offline } from 'react-detect-offline'
import { Outlet } from 'react-router'
import Disconnected from '../components/Disconnected/Disconnected'
import Navbar from '../components/Navbar/Navbar'

export default class UserLayout extends Component {
  render() {
    return (
      <div className='User_layout'>
       <Offline><Disconnected/></Offline>

        <Navbar auth={false} />
        <Outlet/>
      </div>
    )
  }
}
