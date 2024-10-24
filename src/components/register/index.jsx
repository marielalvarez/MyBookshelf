
import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth_context';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import './Register.css';
import azureB1 from '../../images/azure-b1.png';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace={true} />}

            <main className="main-container">
                <div className="register-card">
                    <h1 class="register-h1">Create a New Account</h1>
                    <img className='reg-img' src={azureB1} alt="bookshelf" />
                    <form onSubmit={onSubmit}>
                        <div>
                            <input className='register-input'
                                placeholder='Enter your email...'
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <input className='register-input'
                                placeholder='Create strong password...'
                                type="password"
                                required
                                disabled={isRegistering}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>

                            <input className='register-input'
                                placeholder='Confirm strong password...'
                                type="password"
                                required
                                disabled={isRegistering}
                                autoComplete="off"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && <span className="error-message">{errorMessage}</span>}

                        <button className='register-btn' type="submit" disabled={isRegistering}>
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <p className="text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="link a">
                                Click here!
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
