import React, { useState, useEffect } from 'react';
import "../../firebase/firebase";
import { getFirestore, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ModalRL = ({ show, item, onClose }) => {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const db = getFirestore();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleSubmitReview = async () => {

        try {
            const reviewData = {
                userId: currentUser.uid,
                title: item.title,
                review: review,
                authors: item.authors,
                thumbnail: item.thumbnail,
                createdAt: new Date(),
            };
            await addDoc(collection(db, "reviews"), reviewData);

            setReviews([...reviews, reviewData]);

            setReview('');
        } catch (error) {
            console.error("Error saving review: ", error);
        }
    };

    const fetchReviews = async () => {
        try {
            const q = query(collection(db, "reviews"), where("title", "==", item.title));
            const querySnapshot = await getDocs(q);
            const existingReviews = querySnapshot.docs.map(doc => doc.data());
            setReviews(existingReviews);
        } catch (error) {
            console.error("Error fetching reviews: ", error);
        }
    };

    useEffect(() => {
        if (show) {
            fetchReviews();
        }
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
                    <div className="inner-boxRL">
                        <div className='bookRL-container'>
                            {item.thumbnail ? (
                                <img src={item.thumbnail} alt={item.title} />
                            ) : (
                                <div>No thumbnail available</div>
                            )}
                            <div className="info">
                                <h1>{item.title}</h1>
                                <p>By: {item.authors}</p>
                            </div>
                        </div>


                        <div className='rev-container'>
                            <div className="reviews-section">
                                <h2>My thoughts on this book</h2>
                                {reviews.length > 0 ? (
                                    reviews.map((rev, index) => (
                                        <div key={index} className="review-item">
                                            <p>
                                                {
                                                    // Verifica si createdAt es un objeto Timestamp de Firebase
                                                    rev.createdAt && rev.createdAt.seconds
                                                        ? new Date(rev.createdAt.seconds * 1000).toLocaleString()
                                                        : rev.createdAt instanceof Date
                                                            ? rev.createdAt.toLocaleString()
                                                            : 'No date available'
                                                }
                                            </p>
                                            <p>{rev.review}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="With a beautifully woven narrative and thought-provoking themes..."
                                rows="4"
                                cols="50"
                            />

                            <button className='rev-btn' onClick={handleSubmitReview}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalRL;
