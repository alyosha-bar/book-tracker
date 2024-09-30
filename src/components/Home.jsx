import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";


// fix user issue
// separate read and unread
// live data updating
// 

const Home = () => {

    const [books, setBooks] = useState([])

    const [read, setRead] = useState([])
    const [unread, setUnRead] = useState([])

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const { user } = useContext(UserContext)


    // protect route -->  maybe not the best way
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }
    // }, [user])

    const [loading, setLoading] = useState(true);

    // In UserContext or in your component, once the user is set:
    useEffect(() => {
        if (user) {
            setLoading(false); // user is set, stop loading
        }
    }, [user]);

    // Then, in your fetching logic:
    useEffect(() => {
        const getBooks = () => {
            console.log(user);

            fetch(`/api/books/${user.User_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Could not get books');
                    }

                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setBooks(data);
                });
        };

        if (!loading && user?.User_id) {
            getBooks();
            // filter books by status
            const read = books.filter((book) => book.status === 1);
            const unread = books.filter((book) => book.status === 0);

            setRead(read);
            setUnRead(unread);
        }




    }, [loading, user]);

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

    const markRead = (id, status) => {
        console.log(id)

        // send request
        fetch('api/books/read', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "User_id": user.User_id,
                "Book_id": id,
                "Status": status
            })
        }).then( (res) => {
            if (!res.ok) {
                throw new Error("Something wrong.")
            }

            console.log("Success.")
            return 

        }).catch( (err) => {
            console.log(err)
        }) 
    }

    return ( 
        <div className="home-page">
            {/* {user && (
                    <div> Hello, { user.Username }</div>
                )} */}
            <div className="book-list">
                <button onClick={() => {
                    console.log(read)
                    console.log(unread)
                }}> Books </button>
                {user && <h1> Hello, { user.Username }! </h1>}
                <div className="both-lists">
                    <div>
                    {read && read.map( (book) => (
                        <div className="book-card" key={book.book_id}>
                            <h3> {book.title} </h3>
                            <div className="book-status">
                                <div> by {book.author} </div>
                                <div> {book.status} </div>
                                <button 
                                    className="checkbox"
                                    onClick={() => {
                                        // console.log(book)
                                        markRead(book.book_id, 0)
                                    }}
                                > Read </button> 
                            </div>
                            
                        </div>
                    ))}
                    </div>
                    <div>
                        {unread && unread.map( (book) => (
                            <div className="book-card" key={book.book_id}>
                                <h3> {book.title} </h3>
                                <div className="book-status">
                                    <div> by {book.author} </div>
                                    <div> {book.status} </div>
                                    <button 
                                        className="checkbox"
                                        onClick={() => {
                                            // console.log(book)
                                            markRead(book.book_id, 1)
                                        }}
                                    > Read </button> 
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
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