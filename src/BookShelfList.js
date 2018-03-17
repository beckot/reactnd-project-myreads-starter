import React, {Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'

class BookShelfList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
      }


    render() {

        const allShelves = this.props.shelves

        const shelvesHTML = allShelves.map( shelf => {

            return (

                <div key={ shelf.id } className="bookshelf">
                <h2 className="bookshelf-title">{ shelf.name }</h2>
                <BookShelf 
                    books={this.props.books.filter( book => book.shelf === shelf.id ).sort(sortBy('title'))} 
                    onChangeShelf={this.props.onChangeShelf}
                    shelves={allShelves}
                />
            </div>

            )
            
          })

          return(
            
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelvesHTML}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>

          )

    }

}

export default BookShelfList
