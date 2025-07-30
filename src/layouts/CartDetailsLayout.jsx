import React from 'react'
import {HeaderSeeAll,Footer,FooterBottom} from './../components/index'
import { CartDetails } from './../views/pages/index'
const CartDetailsLayout = () => {
  return (
    <div><HeaderSeeAll/>
    <CartDetails/>
    <Footer/>
    <FooterBottom/>
    </div>
  )
}

export default CartDetailsLayout