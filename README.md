# Movie and Book Explorer

This personal project is a web application that allows users to explore books (Google Books API), based on their favourite movie using The Movie Database (TMDB) API. Users can log in, create their personalized "Bookshelf", write reviews, and save them.

## Technologies


- **React**: Front-end framework for building the application interface.
- **TMDB API**: Used to fetch detailed movie data, including posters, overviews, and ratings.
- **Google Books API**: Access book data, including titles, authors, and cover images.
- **Firebase Authentication**: Handles user login, registration, and session management.
- **Firestore**: Scalable NoSQL cloud database to store user data, reviews, and lists.
- **Firebase Hosting**: Hosting platform for deploying the web app, https://film-app-edbe9.web.app/

## Set up
1. Clone the repository:

```
git clone https://github.com/marielalvarez/MyBookshelf

```

2. Install dependencies: 
```
npm install
```
3. Create a .env file in the root directory with your API keys:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

```
4. Set up your Firebase project, then add Firebase configuration to your project.
Add your Firebase configuration to your app by creating another .env entry:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

5. Start the development server:

```
npm start

```
