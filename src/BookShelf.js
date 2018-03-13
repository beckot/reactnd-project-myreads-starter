import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class BookShelf extends Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
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

                            <Book book={book} onChangeShelf={this.props.onChangeShelf} />

                        </li>

                        ))
                }

                </ol>
            </div>
        )

    }
}

export default BookShelf

