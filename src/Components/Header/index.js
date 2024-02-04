import { Component } from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import { FaOpencart } from "react-icons/fa";
import { IoFastFoodSharp} from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {profilePhoto: '', redirect: false}

  componentDidMount() {
    this.userAdditionalDetails()
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('user_id')
    this.setState({redirect: true})
  }


  userAdditionalDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const userId = Cookies.get('user_id')
    const url = `http://localhost:8080/user/additional/details/${userId}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}` 
      }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({profilePhoto: data.userDetails.profile_photo})
  }

  render() {    
    const {profilePhoto, redirect} = this.state

    if (redirect) {
      return <Redirect to='login' />
    }
    return (
      <nav className='nav-container'>
        <Link to="/" className="chatterblast-logo">ChatterBlast</Link>
        <div className='e-commerce-food'>
          <Link to="" >
            <FaOpencart  className='logo-size' />
          </Link>
          <Link to="">
            <IoFastFoodSharp className='logo-size'/>
          </Link>
        </div>
        <div className='social-media-elements'>
          <Link to="/" >
            <IoMdHome className='logo-size'/>
          </Link>
          <Link to="" >
            <IoIosNotifications className='logo-size'/>
          </Link>
          <Link to="" >
            <FaMessage className='logo-size'/>
          </Link>
          <Link to="">
            <div className='profile-card'>
              <img src={profilePhoto} alt="profile" className='profile-image'/>
            </div>
          </Link>
        </div>
        <button onClick={this.onClickLogout}>logout</button>
      </nav> 
    )
  }
}

export default withRouter(Header)
