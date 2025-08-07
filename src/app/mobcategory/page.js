'use client'; // Add this if you're using Next.js App Router

import { useRouter } from 'next/navigation';
import { FaCar, FaBuilding, FaMobileAlt, FaBriefcase, FaTshirt, FaBook, FaMotorcycle, FaTv, FaTruck, FaCouch, FaDog } from 'react-icons/fa';

const categories = [
  { name: "Cars", icon: <FaCar /> },
  { name: "Properties", icon: <FaBuilding /> },
  { name: "Mobiles", icon: <FaMobileAlt /> },
  { name: "Jobs", icon: <FaBriefcase /> },
  { name: "Fashion", icon: <FaTshirt /> },
  { name: "Books & Hobbies", icon: <FaBook /> },
  { name: "Bikes", icon: <FaMotorcycle /> },
  { name: "Electronics", icon: <FaTv /> },
  { name: "Commercial", icon: <FaTruck /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Pets", icon: <FaDog /> }
];

export default function MobileCategories() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/postad');
  };

  return (
    <div style={{ display: 'flex', overflowX: 'scroll', padding: '1rem', gap: '1rem' }}>
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={handleClick}
          style={{
            minWidth: '80px',
            textAlign: 'center',
            padding: '0.5rem',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>{category.icon}</div>
          <div style={{ fontSize: '12px' }}>{category.name}</div>
        </div>
      ))}
    </div>
  );
}