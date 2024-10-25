import React, { useState, useEffect } from 'react';
import "../../firebase/firebase";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../auth_context';
import './readlist.css';
import ModalRL from '../books/ModalRL';
import estante from '../../images/estante.png';
import bookshelfImage from '../../images/bookshelf2.png';


const Readlist = () => {
    const { currentUser } = useAuth();
    const [readList, setReadList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();

    const db = getFirestore();

    const fetchReadList = async () => {
        if (!currentUser) return;

        try {
            const q = query(
                collection(db, "users", currentUser.uid, "myReadList")
            );

            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => doc.data());

            setReadList(items);
        } catch (error) {
            console.error("Error fetching read list: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchReadList();
        }
    }, [currentUser]);

    if (loading) {
        return <h3>Loading your read list...</h3>;
    }

    if (readList.length === 0) {
        return <div className='bookshelf'>
            <h1 className='bs-title'>No items in your read list.</h1>
            <div className='img-container'><img className='rl-img' src={bookshelfImage} alt="bookshelf" /></div>



        </div >;
    }

    return (
        <div className='bookshelf'>
            <div className='img-title'>

                <h1 className='bs-title'>Bookshelf</h1>

                <img className='estante' src={estante} alt="bookshelf" />
            </div>
            <div className="books-container">
                {readList.map((item, index) => (
                    <div key={index} className="book-item" onClick={() => { setShow(true); setItem(item) }}>
                        {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
                        <h4>{item.title}</h4>
                        <p>{item.authors}</p>
                    </div>

                ))}
                <ModalRL show={show} item={bookItem} onClose={() => setShow(false)} />

            </div>
        </div>
    );
};

export default Readlist;
