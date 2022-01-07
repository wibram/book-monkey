import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books!: Book[];
  //@Output() showDetailsEvent = new EventEmitter<Book>();

  constructor( private bookService: BookService ) {}

  // showDetails( book: Book ) {
  //   this.showDetailsEvent.emit( book );
  // }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe( (books) => ( this.books = books ) );
      // books.map( b => <Book>{
      //   isbn: b.isbn,
      //   title: b.title,
      //   authors: b.authors,
      //   published: new Date( b.published ),
      //   subtitle: b.subtitle,
      //   rating: b.rating,
      //   thumbnails: b.thumbnails,
      //   description: b.description
      // } ) ) );

    /* #region old */
    // this.books = [
    //   {
    //     isbn: '9812307493',
    //     title: 'Angular',
    //     authors: ['a1', 'a2'],
    //     published: new Date(2020, 8, 1),
    //     subtitle: 'Grundlagen',
    //     rating: 5,
    //     thumbnails: [{
    //       url: 'https://ng-buch.de/angular-cover.jpg',
    //       title: 'Buchcover'
    //     }],
    //     description: 'Lernbuch'
    //   },
    //   {
    //     isbn: '53201651352',
    //     title: 'TypeScript',
    //     authors: ['a3'],
    //     published: new Date(2021, 9, 2),
    //     subtitle: 'TS Grundlagen',
    //     rating: 5,
    //     thumbnails: [{
    //       url: 'https://ng-buch.de/react-cover.jpg',
    //       title: 'Buchcover'
    //     }],
    //     description: 'Praxisbuch'
    //   }
    // ];
    /* #endregion */
  }

  // onSelected(isbn: string): void {
  //   console.log(isbn);
  // }
}
