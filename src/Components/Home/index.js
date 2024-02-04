import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import UserDetails from '../userDetails'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {users: '', request: ''}

  componentDidMount() {
    this.gettingusers()
  }

  gettingusers = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const userId = Cookies.get('user_id')

    const url = `http://localhost:8080/user/details/${userId}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}` 
      }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({users: data.userDetails})
  }
  
  render() {
    const {users, request} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className='users-container'>
            <p className='home-side-heading'>Requests</p>
            <div className='requests-container'>
                {request && request.length > 0 ? (
                  request.map((each, index) => (
                    <UserDetails key={index} userDetails={each} />
                  ))
                ) : (
                  <p>No requests found</p>
                )}
            </div>
            <p className='home-side-heading'>Suggestions</p>
            <div className='users-list'>
              {users && users.length > 0 ? (
                users.map((each, index) => (
                  <UserDetails key={index} userDetails={each} />
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
          <div className='post-container'>
            posts
          </div>
          <div className='settings'>
            settings
          </div>
        </div>
      </>
    )
  }
  }

export default Home
