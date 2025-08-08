"use client";
import React from 'react';
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from 'next/navigation';
import AllAds from './postedad/page';

const Home = () => {
 
  return (
    <div className="home-container"><AllAds/>
    </div>
  );
};

export default Home;
