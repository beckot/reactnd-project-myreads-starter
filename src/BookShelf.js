import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType: PropTypes.string.isRequired
      }

    render() {

        let booksOnShelf = this.props.books.filter( (book) => book.shelf === this.props.shelfType )
        booksOnShelf.sort(sortBy('title'))

        return (

            <div className="bookshelf-books">
                <ol className="books-grid">   
                {
                    booksOnShelf.map( (book) => (

                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {book.authors.map( (author) => (
                                    
                                        <div key={book.id + author}>{author}</div>
                                    
                                    ) 
                                    )}</div>
                            </div>
                        </li>

                        ))
                }

                </ol>
            </div>
        )

    }
}

export default BookShelf

