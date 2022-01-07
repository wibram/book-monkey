import { Component } from '@angular/core';
// import { Book } from './shared/book';
// import { ViewState } from './shared/viewstateEnum'

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-monkey';
  // book!: Book;
  // readonly ViewState = ViewState;
  // viewState: ViewState = ViewState.List;

  // showList(): void {
  //   this.viewState = ViewState.List;
  // }

  // showDetails( book: Book ): void {
  //   this.book = book;
  //   this.viewState = ViewState.Details;
  // }
}
