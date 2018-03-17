import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchPage extends Component {
    
    static propTypes = {
        shelvedBooks: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired
    }

    state = {
        query: "",
        foundBooks: [],
        isQueryChanged: false,
        errorMessage: ""

    }


    updateQuery = (query) => { 
        this.setState({query: query})
        query && this.getBooks(query)
    }
    

    getBooks = (query) => {
        BooksAPI.search(query).then(searchResults => {
            
            if (searchResults.hasOwnProperty("error")) {
                this.setState({errorMessage: searchResults.error});
            } else {
                let sortedAndShelvedBooks = searchResults.map( book => {
                    let shelf = this.getShelf(book, this.props.shelvedBooks)
                    return ({...book, shelf: shelf })
                }).sort(sortBy("title"))
                this.setState({
                    errorMessage: "",
                    foundBooks: sortedAndShelvedBooks
                });
            }
        })        
    }

    getShelf(book, shelvedBooks) {
        let matchingBook = shelvedBooks.find( e => e.id === book.id ) 
        if (typeof(matchingBook) === "undefined" ) 
        { 
            return "none"
        } else {
            return matchingBook.shelf
        } 
    }

    render() {

        const books = this.state.foundBooks
        const error = this.state.errorMessage
        const query = this.state.query

        
        return (
         
            <div className="search-books">
            
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">

                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                
                <div className="search-books-results">
                {
                    query.length !== 0 && (
                        error.length > 0 ? 
                        (<div><b>⚠️Error: </b> {error} </div>) : 
                        (
                            <ol className="books-grid"> 
                            {books.map( (book) => (
                                <li key={book.id}>
                                    <Book 
                                        book={book}
                                        onChangeShelf={this.props.onChangeShelf}
                                        shelves={this.props.shelves}
                                    />
                                </li>   
                            ))}
                            </ol>
                        )
                    )
         
                }
                        
                </div>
            </div>

        )

    }

}

export default SearchPage
