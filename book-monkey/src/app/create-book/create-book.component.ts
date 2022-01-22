import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router )
  { }

  ngOnInit(): void {
  }

  createBook(book: Book): void {
    this.bookService.addBook(book).subscribe( () => {
      this.router.navigate(['../..', 'books'], { relativeTo: this.route } );
    });
  }

  cancelBook(): void {
    this.router.navigate(['../..', 'books'], { relativeTo: this.route } );
  }
}
