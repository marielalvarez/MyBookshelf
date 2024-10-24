import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth_context';
import { doSignOut } from '../../firebase/auth';
import azureB1 from '../../images/film-spin.png';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    return (
        <nav>
            <img className='header-img' src={azureB1} alt="bookshelf" />

            <h2 className='nav-title'>MyBookShelf</h2>
            {userLoggedIn ? (
                <div className='header-loggedin'>
                    <Link to={'/home'}>Discover</Link>
                    <Link to={'/readlist'}>Shelf</Link>
                    <button className='header-btn'
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/login');
                            });
                        }}
                    >
                        Logout
                    </button></div>
            ) : (
                <div className='a-container'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register New Account</Link>
                </div>
            )}
        </nav>
    );
};

export default Header;
