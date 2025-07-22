import React from "react";
import { Header,HeaderTop,Footer,FooterBottom,Slider,PopularBrands,LowestPrice} from "../components/index.js";
const LandingPage = () => {

  const sliderData = [
    [
      {
        image: 'https://via.placeholder.com/150',
        title: 'Necklace Combo+ 2 earrings',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '₹3000'
      },
      {
        image: 'https://via.placeholder.com/150',
        title: 'RAKHI SALE Giva 925 ...',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '₹1499'
      },
      {
        image: 'https://via.placeholder.com/150',
        title: 'Barbie Erika From Princess...',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '₹12000'
      },
      {
        image: 'https://via.placeholder.com/150',
        title: 'Set Of 6 Body & Hair Oil...',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '360 Coins'
      }
    ],
    [
      {
        image: 'https://via.placeholder.com/150',
        title: 'Brass Animals For Show...',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '₹1300'
      },
      {
        image: 'https://via.placeholder.com/150',
        title: 'Asaya Sheerscrea',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: '₹229'
      },
      // Add more items as needed
    ]
  ];

  return (
    <div>
      <Header />
      <HeaderTop/>
      <LowestPrice/>
      <PopularBrands/>
      <Slider heading="Fresh Deals, under ₹300" items={sliderData} />
         <Footer/>
         <FooterBottom/>
    </div>
  );
};

export default LandingPage;
