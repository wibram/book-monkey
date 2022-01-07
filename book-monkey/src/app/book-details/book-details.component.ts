import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  //@Input() book!: Book;
  //@Output() showListEvent = new EventEmitter<any>();

  constructor(
    private bookService$: BookService,
    private route: ActivatedRoute,
    private router: Router )
  { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;

    this.bookService$.getBook( params.get('isbn') as string ).subscribe( (book) => ( this.book = book ) );
      // book.map( b => <Book>{
      //   isbn: b.isbn,
      //   title: b.title,
      //   authors: b.authors,
      //   published: new Date( b.published ),
      //   subtitle: b.subtitle,
      //   rating: b.rating,
      //   thumbnails: b.thumbnails,
      //   description: b.description
      // } ) ) );
  }

  getRating(num: number) {
    return new Array(num);
  }

  // showBookList() {
  //   this.showListEvent.emit();
  // }

  removeBook() {
    if ( confirm('Buch wirklich löschen?') ) {
      this.bookService$.deleteBook( this.book )
        .subscribe( res => this.router.navigate( ['../'], { relativeTo: this.route } )
      );
    }
  }
}
