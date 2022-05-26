import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import BusinessCard from './BusinessCard';
import Services from './Services';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <BusinessCard></BusinessCard>
            <Testimonial></Testimonial>
            <Footer></Footer>
        </div>
    );
};

export default Home;