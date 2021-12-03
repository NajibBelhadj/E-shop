import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories = [
    {
      id: 1,
      name: "categories 1",
      icon: "icon1"
    },
    {
      id: 2,
      name: "categories 2",
      icon: "icon2"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
