import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";


// fix user issue
// separate read and unread
// live data updating
// 

const Home = () => {

    const [books, setBooks] = useState([])

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    // protect route -->  maybe not the best way
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

    // fetch all books
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

        if (user) {
            getBooks()
        }
        

    }, [])

    // form function
    const addBook = (e) => {
        e.preventDefault()

        console.log(title)
        console.log(author)

        // submit request to server
        fetch('/api/books', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "User_id": user.User_id, 
                "Book_id": 8,
                "Title": title,
                "Author": author
            })
        }).then( (res) => {
            if (res.ok) {
                console.log("Book Added.")
            } else {
                console.log("Failed. ")
            }
        }).catch( (err) => {
            console.error("Error: ", err)
        })

        setTitle('')
        setAuthor('')
    }

    const markRead = (id) => {
        console.log(id)

        // send request 
    }

    return ( 
        <div className="home-page">
            {/* {user && (
                    <div> Hello, { user.Username }</div>
                )} */}
            <div className="book-list">
                <h1> Hello, { user.Username }! </h1>
                {books && books.map( (book) => (
                    <div className="book-card" key={book.book_id}>
                        <h3> {book.title} </h3>
                        <div className="book-status">
                            <div> by {book.author} </div>
                            {/* <div> {book.status} </div> */}
                            <button 
                                className="checkbox"
                                onClick={() => {
                                    // console.log(book)
                                    markRead(book.book_id)
                                }}
                            > Read </button> 
                        </div>
                        
                    </div>
                ))}
            </div>

            <form onSubmit={addBook} className="book-form">
                <h2> Add New Book </h2>
                <div className="label-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}      
                    />
                </div>
                <div className="label-group">
                    <label htmlFor="author">Author: </label>
                    <input 
                        type="text"
                        name="author"  
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }}  
                    />
                </div>
                <button className="submit-btn" type="submit"> Add Book </button>
            </form>


            {/* <button onClick={() => {
                console.log(user)
            }}></button> */}
        </div>
     );
}
 
export default Home;