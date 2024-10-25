import React, { useState } from 'react';
import "../../firebase/firebase";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../auth_context';

const Modal = ({ show, item, onClose }) => {
    const { currentUser } = useAuth();
    const db = getFirestore();

    const saveDataToFirestore = async () => {
        try {
            const docRef = await addDoc(collection(db, "users", currentUser.uid, "myReadList"), {
                thumbnail: item.volumeInfo?.imageLinks?.smallThumbnail || null,
                title: item.volumeInfo.title || "No title available",
                authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : "No authors available",
                userId: currentUser.uid
            });
            alert("Added to read list!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    if (!show) {
        return null;
    }

    let thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail || "No image available";


    return (
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}>x</button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <p>Author: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : "No authors available"}</p>
                            <p>Publisher: {item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></p><br />
                            <a href={item.volumeInfo.previewLink}><button className='addfav'>More</button></a>
                            <button className='addfav' onClick={saveDataToFirestore}>BookShelf</button>
                        </div>
                    </div>
                    <p className="description">{item.volumeInfo.description}</p>
                </div>
            </div>
        </>
    );
}

export default Modal;
