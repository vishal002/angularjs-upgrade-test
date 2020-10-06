import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-page',
  templateUrl: './new-page.html',
  styleUrls: ['./new-page.css']
})
export class NewPageComponent implements OnInit {

  message: string;

  onShown(): void {
    this.message = 'shown';
  }

  onHidden(): void {
    this.message = 'hidden';
  }

  constructor() { }

  ngOnInit() {}

}
