"use client";
import React from 'react';
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from 'next/navigation';
import AllAds from './postedad/page';

const Home = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/postad'); 
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">
        Post New Ad 
        <GrAddCircle 
          className="add-icon" 
          onClick={handleRedirect} 
          title="Click to post your ad"
        />
      </h1>
    </div>
  );
};

export default Home;
