import { Component } from '@angular/core';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_ListItem, MEALDB_Category } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  meals: MEALDB_ListItem[] | null = [];
  categories: string[];

  constructor(private mealdb: MealdbApiService) {
    this.loadData();
    this.categories = Object.keys(MEALDB_Category);
  }

  loadData(categoryName: string = "Seafood") {
    this.mealdb.getMealsByCategory(categoryName)
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      })
  }

  onChange(event: any)
  {
    let value: string = event.target.value;
    this.loadData(value);
  }

}
