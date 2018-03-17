import React from 'react'
import { Route } from 'react-router-dom'
import BookShelfList from './BookShelfList'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books: [],
    shelves: [
      {
        "name": "Currently Reading",
        "id": "currentlyReading"
      },
      {
        "name": "Want to Read",
        "id": "wantToRead"
      },
      {
        "name": "Read",
        "id": "read"
      }
    ]
  }


  componentDidMount() {
    BooksAPI.getAll().then((booksOnShelves) => {
      this.setState( { books: booksOnShelves } )
    })
  }


  changeBookShelf = (bookToMove, newShelfValue) => {

    this.setState(state => {
        
        // Filter out all other books except this book.  
        const otherBooks = state.books.filter(book => book.id !== bookToMove.id);
        
        // Update shelf value
        bookToMove.shelf = newShelfValue
         
        // Return a new collection of books where we have added the bookToMove with a new shelf value to the end of the array.
        return {
          books: otherBooks.concat(bookToMove)
      };
    });

    //Update the database
    BooksAPI.update(bookToMove, newShelfValue);
  }

  render() {
    
    return (
      
      <div className="app">
        
        <Route exact path="/" render={ () => (
            <BookShelfList 
              books={this.state.books}
              shelves={this.state.shelves}
              onChangeShelf={this.changeBookShelf} 
            />
        )} />

        <Route path="/search" render={ () => (
          <SearchPage onChangeShelf={this.changeBookShelf} shelvedBooks={this.state.books} shelves={this.state.shelves}/>
        )} />
  
      </div>
    )
  }
}

export default BooksApp
