import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired
    }

    render() {
        
        const currentBook = this.props.book

        // Print book thumbnail in case there is one
        const bookCoverHTML = ( currentBook.hasOwnProperty("imageLinks") && currentBook.imageLinks.hasOwnProperty("smallThumbnail") ) ? (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${currentBook.imageLinks.smallThumbnail})`}}></div>
        ) : (
            <div className="book-cover">></div>
        )

        const optionsHTML = (
            <select value={currentBook.shelf} onChange={e => this.props.onChangeShelf( currentBook, e.target.value )}>
                <option value="move-to-option" disabled >Move to...</option>
                {this.props.shelves.map( shelf => {
                    return <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                })}
                <option value="none">None</option>   
            </select>
        )
    
        const authorsHTML = (
            
            <div className="book-authors">
                {  

                    this.props.book.hasOwnProperty("authors") &&
                    this.props.book.authors.map( (author) => {
                        return( <div key={this.props.book.id + author}>{author}</div> )
                    })                  
                }
            </div>    
        
        )
        

        return(
        
            <div className="book">
                <div className="book-top">
                {bookCoverHTML}
                <div className="book-shelf-changer">
                    {console.log(currentBook.title + " -shelf: " + currentBook.shelf)}
                    {optionsHTML}
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {authorsHTML}
            </div>

        )
    }

}

export default Book
