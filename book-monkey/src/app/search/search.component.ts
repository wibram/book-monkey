import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, tap } from 'rxjs';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>();
  isLoading: boolean = false;
  foundBooks: Book[] = [];

  constructor( private bookService: BookService ) { }

  ngOnInit(): void {
    this.keyUp$
      .pipe(
        filter( term => term.length >= 3 ),
        debounceTime( 500 ),
        distinctUntilChanged(),
        tap( () => this.isLoading = true ),
        switchMap( searchTerm => this.bookService.getBooksFiltered( searchTerm ) ),
        tap( () => this.isLoading = false )
      )
      .subscribe( books => this.foundBooks = books );
  }

}
