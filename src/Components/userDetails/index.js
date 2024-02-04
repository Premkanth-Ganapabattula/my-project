import { Component } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import { FaPersonCirclePlus, FaPersonCircleQuestion } from "react-icons/fa6";

import './index.css'

class UserDetails extends Component {
    state = {isFriendRequestSent: false}

    onClickCancelButton = async () => {
        const {user_id} = this.props.userDetails
        const jwtToken = Cookies.get('jwt_token')
        const requestedUserId = Cookies.get('user_id')
        const friendRequestBody = {
            requestSentBy : requestedUserId,
            requestSentTo : user_id
        }
        const url = 'http://localhost:8080/delete/friend/request/'
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}` 
              },
            body: JSON.stringify(friendRequestBody)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (data.message === 'Deleted Success') {
            this.setState({isFriendRequestSent: false})
        }

    }

    onClickAddButton = async () => {
        const {user_id} = this.props.userDetails
        const jwtToken = Cookies.get('jwt_token')
        const requestedUserId = Cookies.get('user_id')
        const time = new Date()
        const utcString = moment(time).utc().format();

        const friendRequestBody = {
            requestSentBy : requestedUserId,
            requestSentTo : user_id,
            utcTime : utcString
        }
        const url = 'http://localhost:8080/friend/request/'
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}` 
              },
            body: JSON.stringify(friendRequestBody)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (data.message === 'Upload Success') {
            this.setState({isFriendRequestSent: true})
        } 

    }
    render() {
        const {userDetails} = this.props
        const {profile_photo, username, first_name, last_name} = userDetails
        const {isFriendRequestSent} = this.state
        return (
            <div className='user-card'>
                <div className='image-content'>
                    <div className='profile-card-h'>
                        <img src={profile_photo} alt={username} className='profile-photo-h' />
                    </div>
                    <div className='username-name'>                
                        <p className='username'>{username}</p>
                        <p className='name_of_user'>{first_name + " " + last_name}</p>
                    </div>
                </div>
                <div className='button-card'>
                    {isFriendRequestSent?
                        <button className='buttons' onClick={this.onClickCancelButton}>
                            <FaPersonCircleQuestion title='Cancel Request' className='request-sent-logo' />
                        </button>
                    : <button className='buttons' onClick={this.onClickAddButton}>
                        <FaPersonCirclePlus title='Send Request' className='addfriend-logo'/>
                    </button>
                    }
                </div>      
            </div>
        )
    }
}

export default UserDetails