import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'

import './App.css'

class BooksApp extends React.Component {
  
    state = {
      books: []
    }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( { books } )
    })
  }

  changeBookShelf(book, newShelf) {
    
     // 1. Update the book shelf in the API
      BooksAPI.update(book, newShelf).then( () => {
        
        this.setState( state => ({
          
          // 2. Constuct a new book array and change the shelf for the single book we are changing....
          books: state.books.map( oldBook => {

            // Test whether the current book ID matches the one we are replacing...
            oldBook.id === book.id ?

            // If there's a match, use the ES6 spread operator (...) to expand the book object and modify the existing shelf name
            { ...oldBook, shelf: newShelf } :

            // Otherwise, just use the existing book element.
            oldBook
                            
          })

        }))

      })

  }



  render() {
    
    return (
      
      <div className="app">
        
        <Route exact path="/" render={ () => (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookShelf 
                    shelfType="currentlyReading"
                    books={this.state.books} 
                    onChangeShelf={this.changeBookShelf}
                    />
                </div>
                
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf 
                    shelfType="wantToRead"
                    books={this.state.books} 
                    onChangeShelf={this.changeBookShelf}
                    />
                </div>
                
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf 
                    shelfType="read"
                    books={this.state.books} 
                    onChangeShelf={this.changeBookShelf}
                    />
                </div>
                
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      )
      } />

      <Route path="/search" render={ () => (
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
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
      )}
      />
  
      </div>
    )
  }
}

export default BooksApp
