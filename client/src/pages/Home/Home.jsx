import React, { useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { StoreContext } from '../../context/Store';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, loading } = useContext(StoreContext);
  console.log(user);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Header />
      <div className="home">
        {user ? (
          <p>Welcome, {user.username}!</p>
        ) : (
          <p>Welcome, guest!</p>
        )}
      </div>
      {user && user.role === 'admin' && (
        <button>
          <Link to='/dashboard'>Dashboard</Link>
        </button>
      )}
    </>
  );
};

export default Home;
