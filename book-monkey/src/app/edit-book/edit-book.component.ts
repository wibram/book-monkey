import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book!: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router )
  { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map( params => params.get( 'isbn' ) as string ),
      switchMap( (isbn: string) => this.bookService.getBook( isbn ) )
    )
    .subscribe( book => this.book = book );
  }

  saveBook(book: Book): void {
    this.bookService.updateBook(book).subscribe( () => {
      this.router.navigate(['../../..', 'books', book.isbn], { relativeTo: this.route } );
    });
  }
}
