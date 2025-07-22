import React from 'react';
import SliderComponent from './Slider';

const productList = [
  {
    image: 'https://via.placeholder.com/150',
    title: 'Asaya Sheerscream Suns...',
    description: 'Trusted Store',
    price: '₹229 ₹599',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Imported Facial Mist',
    description: '1000 Coins',
    price: '₹130 ₹4000',
  },
  // Add more real items...
];

const ReusableSlider = () => {
  return <SliderComponent heading="Fresh Deals, under ₹300" items={productList} />;
};

export default ReusableSlider;
