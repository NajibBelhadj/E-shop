import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http :HttpClient) {}
  apiUrlCategories = environment.apiUrl+'categories/'
   getCategories(): Observable<Category[]> {
     return this.http.get<Category[]>(this.apiUrlCategories )
   }

   getCategorie(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrlCategories+categoryId)
  }

   createCategory(category: Category): Observable<Category>{
     return this.http.post<Category>(this.apiUrlCategories,category)
   }

   updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(this.apiUrlCategories+category.id,category)
  }

   deleteCategory(categoryId: String): Observable<any>{
    return this.http.delete<any>(this.apiUrlCategories+categoryId)
  }
}
