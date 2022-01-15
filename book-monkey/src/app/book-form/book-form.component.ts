import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BookFactory } from '../shared/book-factory';
import { Book, Thumbnail } from '../shared/book';
import { FormGroup, FormBuilder, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  //book: Book = BookFactory.empty();
  bookForm!: FormGroup;

  @Output() submitBook = new EventEmitter<Book>();
  //@ViewChild( 'bookForm', { static: true } ) bookForm?: NgForm;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if ( this.bookForm ) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{title: '', url: ''}]),
      published: []
    });
  }

  submitForm(): void {
    const formValue = this.bookForm?.value;

    const authors = formValue.authors.filter( (author: string) => author );
    const thumbnails = formValue.thumbnails.filter( (thumbnail: Thumbnail) => thumbnail.url );

    const newBook: Book = {
      ...formValue,
      authors,
      thumbnails
    };

    this.submitBook.emit( newBook );
    this.bookForm?.reset();
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
