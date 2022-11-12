import React from 'react';
import ControlledCarousel from '../components/Carousel';



const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <main className="">
      <div className="">
    
        <ControlledCarousel />

      </div>
    </main>
  );
};

export default Home;
