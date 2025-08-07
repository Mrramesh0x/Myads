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
    </div>
  );
};

export default Home;
