import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@Frontend/products'
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories : Category[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService ,
    private categoriesService: CategoriesService,
    private router: Router,
    ) { }

  ngOnInit(): void {
   this._getCategories();
  }

  deleteCategory(categoryId: string){

    this.confirmationService.confirm({
      message: 'Are you sure To Delete this Category',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(response =>{
          this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Category is deleted'
         });
         this._getCategories();
       },
      (error)=>{
         this.messageService.add({
          severity:'error',
          summary:'Error', 
          detail:'Category is not deleted'});
      });
      },
      reject: () => {
         
      }
  });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService
    .getCategories()
    .subscribe(cats =>{
      this.categories = cats;
    })
  }

}
