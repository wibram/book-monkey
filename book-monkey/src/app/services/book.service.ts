import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Book } from '../shared/book';
import { API_URL } from '../shared/tokens';
import { BookRaw } from '../shared/book-raw';
import { BookFactory } from '../shared/book-factory';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})

export class BookService {
    //private apiUrl = "http://localhost:5000/books";
    //myResponse!: HttpResponse<Book[]>;

    constructor( private http: HttpClient, @Inject(API_URL) private token: string ) {}

    private get APIUrl(): string {
        return this.token;
    }

    getBooks(): Observable<Book[]> {
        //return this.http.get<Book[]>( this.APIUrl );
        return this.http.get<BookRaw[]>( this.APIUrl )
            .pipe(
                retry( 2 ),
                map( bRaw => bRaw.map( b => BookFactory.fromRaw( b ) ) ),
                catchError( this.errorHandler )
        );
    }

    getBooksFiltered( filter: string ): Observable<Book[]> {
        return this.http.get<BookRaw[]>( this.getUrlWithFilter( filter ) )
            .pipe(
                retry( 2 ),
                map( bRaw => bRaw.map( b => BookFactory.fromRaw( b ) ) ),
                catchError( this.errorHandler )
            );
    }

    // funktioniert nicht, observable muss zurückgegeben werden, da der aufrufer subscribe aufruft
    // getBooks(): Book[] {
    //     this.http.get<Book[]>( this.APIUrl, { observe: 'response' } )
    //         .subscribe( res => this.myResponse = res );

    //     let b: Book[] = [{ isbn: '', title: '', authors:[''], published:new Date('') }];
    //     let b2: Book[] = [];
        
    //     if ( this.myResponse.status === 200 || this.myResponse.status === 304 ) {
    //         if ( this.myResponse.body !== null ) {
    //             return this.myResponse.body;
    //         }
    //     }

    //     return b2;
    // }

    getBook( isbn: string ): Observable<Book> {
        // return this.http.get<Book>( this.getUrlWithId( isbn ) );
        return this.http.get<BookRaw>( this.getUrlWithId( isbn ) )
            .pipe(
                retry( 2 ),
                map( b => BookFactory.fromRaw( b ) ),
                catchError( this.errorHandler )
        );
    }

    addBook( book: Book ): Observable<Book> {
        return this.http.post<Book>( this.APIUrl, book, httpOptions );
    }

    updateBook( book: Book ): Observable<Book> {
        return this.http.put<Book>( this.getUrlWithId( book.isbn ), book, httpOptions );
    }

    deleteBook( book: Book ): Observable<Book> {
        return this.http.delete<Book>( this.getUrlWithId( book.isbn ) );
    }

    private getUrlWithId( isbn: string ): string {
        return `${this.APIUrl}/${isbn}`;
    }

    private getUrlWithFilter( filter: string ): string {
        return `${this.APIUrl}?q=${filter}`;
    }

    private errorHandler( error: HttpErrorResponse ): Observable<any> {
        console.error( 'Fehler aufgetreten!' );
        return throwError( error );
    }
}