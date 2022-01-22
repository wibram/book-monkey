import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { BookFactory } from '../shared/book-factory';
import { Book, Thumbnail } from '../shared/book';
import { FormGroup, FormBuilder, NgForm, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  //book: Book = BookFactory.empty();
  bookForm!: FormGroup;

  @Input() book?: Book;
  @Input() editing: boolean = false;
  @Output() submitBook = new EventEmitter<Book>();
  @Output() cancelBook = new EventEmitter();
  //@ViewChild( 'bookForm', { static: true } ) bookForm?: NgForm;

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
    this.setFormValues( this.book );
  }

  setFormValues(book: Book | undefined) {
    if ( book ) {
      this.bookForm?.patchValue( book );

      this.bookForm?.setControl( 'authors', this.buildAuthorsArray( book.authors ) );

      if ( book.thumbnails ) {
        this.bookForm?.setControl( 'thumbnails', this.buildThumbnailsArray( book.thumbnails ) );
      }
      else {
        this.bookForm?.removeControl( 'thumbnails' );
        this.addThumbnailControl();
      }
    }
  }

  private initForm() {
    if ( this.bookForm ) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing},
        [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{title: '', url: ''}]),
      published: []
    });
  }

  submitForm(): void {
    const formValue = this.bookForm?.value;

    const isbn = this.editing ? this.book?.isbn : formValue.isbn;

    const authors = formValue.authors.filter( (author: string) => author );
    const thumbnails = formValue.thumbnails.filter( (thumbnail: Thumbnail) => thumbnail.url );

    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };

    this.submitBook.emit( newBook );
    this.bookForm?.reset();
  }

  cancel(): void {
    //this.bookForm?.reset();
    //this.router.navigate(['../..', 'books'], { relativeTo: this.route } );
    this.cancelBook.emit();
  }

  private buildAuthorsArray( values: string[] ): FormArray {
    return this.fb.array( values, Validators.required );
  }

  private buildThumbnailsArray( values: Thumbnail[] ): FormArray {
    return this.fb.array( values.map( t => this.fb.group( t ) ) );
  }

  get authors(): FormArray {
    return this.bookForm?.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm?.get('thumbnails') as FormArray;
  }

  addAuthorControl() {
    this.authors.push( this.fb.control('') );
  }

  addThumbnailControl() {
    this.thumbnails.push(
      this.fb.group( { url:'', title:'' } )
    );
  }
}
