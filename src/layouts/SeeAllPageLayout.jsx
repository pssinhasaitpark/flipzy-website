import React from 'react'
import {HeaderSeeAll,Footer,FooterBottom,DownloadQR} from './../components/index'
import {SeeAllPages} from './../views/pages/index'
const SeeAllPageLayout = () => {
  return (
   <div><HeaderSeeAll/>
  <SeeAllPages/>
  <DownloadQR/>
    <Footer/>
    <FooterBottom/>
    </div>
  )
}

export default SeeAllPageLayout