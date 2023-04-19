import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h5 className='text-center'>All Right Reserved &copy; ASHIK MAHMUD</h5>
        <p className='text-center ml-3'>
            <Link to="/about">About</Link>|
            <Link to="/contact">Contact</Link>|
            <Link to="/policy">Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer