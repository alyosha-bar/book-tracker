// checklist for home page
// 1. fetch read & unread books
// 2. display two lists

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

// 3. make form for new book addition

// 4. marking book read/unread



const Home = () => {

    const [books, setBooks] = useState([])

    const { user } = useContext(UserContext)



    useEffect( () => {
        const getBooks = () => {

            console.log(user)

            fetch(`/api/books/${user.User_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then( (res) => {
                if (!res.ok) {
                    throw new Error("Could not get books")
                }

                return res.json()
            }).then( (data) => {
                console.log(data)
                setBooks(data)
            })
        }

        console.log(user)

        // getBooks()

    }, [user])

    return ( 
        <div>
            <h1>Home Page</h1>
            {books && books.map( (book) => (
                <div key={book.book_id}>
                    <div> {book.title} </div>
                </div>
            ))}
        </div>
     );
}
 
export default Home;