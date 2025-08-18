import React from 'react'
import { Header,Footer,FooterBottom} from '../components'
import{ Profile } from '../components/index.js'
const ProfileLayout = () => {
  return (
    <div><Header/>
    <Profile/>
    <Footer/>
    <FooterBottom/></div>
   
  )
}

export default ProfileLayout