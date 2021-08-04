import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {DataGrid} from '@material-ui/data-grid'
import { getBooks } from '../actions/bookActions';


const bookObj = {
    "title": "Unlocking Android",
    "isbn": "1933988673",
    "pageCount": 416,
    "publishedDate": { "$date": "2009-04-01T00:00:00.000-0700" },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
    "longDescription": "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
    "status": "PUBLISH",
    "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    "categories": ["Open Source", "Mobile"],
    "price" : 456
  }

class BookClassComponent extends Component {

    constructor() {
        super()
        this.state = {
            book : bookObj,
            columns : this.getColumnData()
        }
    }

    getColumnData() {
        return [
            { field: 'id', headerName: 'ID', width: 150 },
            { field: 'title', headerName : "Title" , width : 150, editable: false},
            {
                field: 'shortDescription',
                headerName: 'Description',
                width: 300,
                editable: true,
              },
              {
                field: 'shortDescription',
                headerName: 'Description',
                width: 150,
                editable: true,
              },
              {
                field: 'pageCount',
                headerName: 'Page Count',
                width: 150,
                editable: true,
              },
              {
                field: 'price',
                headerName: 'Price',
                width: 150,
                editable: true,
              },

        ]
    }

    setRowData(books) {
        let rowArr = []
        books.map((book) => {
            let id = book.isbn;
            let price = book.price;
            let shortDescription = book.shortDescription;
            let title = book.title;
            let pageCount = book.pageCount;
            let rowData = {
                id : id,
                title : title,
                shortDescription : shortDescription,
                pageCount : pageCount,
                price : price
            }
            rowArr.push(rowData)

        })

        return rowArr

        //this.setState({bookRows : rowArr})
        
    }

    componentDidMount() {
        console.log('mounting data')
        console.log(this.props.getAllBooks())
    }


    render() {
        console.log('rendering class component')
        console.log('props data in calss component')
        console.log(this.props.books)
        let rows = []
        if(this.props.books) {
           rows =  this.setRowData(this.props.books)
           console.log('after row data') 
           console.log(rows)
        }
        
        console.log(this.state)
        return (
            <>
                BookClassComponent
                <div style={{ height: 680, width: 800,margin: '50px' }}>
                    <DataGrid
                        rows={rows}
                        columns={this.state.columns}
                        pageSize={10}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapping state props')
    console.log(state);
    return {
        books : state.booksData.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllBooks : getBooks,
        dummy : 'dummyData'
    },dispatch)
}

export default connect(mapStateToProps , mapDispatchToProps) (BookClassComponent)