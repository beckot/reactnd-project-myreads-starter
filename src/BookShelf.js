import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired
      }

    render() {

        let booksOnShelfSorted = this.props.books

        return (

            <div className="bookshelf-books">
                <ol className="books-grid">   
                {
                    booksOnShelfSorted.map( (book) => (

                        <li key={book.id}>

                            <Book 
                                book={book} 
                                onChangeShelf={this.props.onChangeShelf}
                                shelves={this.props.shelves} />

                        </li>

                        ))
                }

                </ol>
            </div>
        )

    }
}

export default BookShelf

