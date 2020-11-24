import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../mealdb-api.service';
import { Observable } from 'rxjs';
import { MEALDB_Meal } from '../model';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage{
  mealId: string;
  meal$: Observable<MEALDB_Meal>; // propriété contenant un observable
  ingredients: string[];

  constructor(
    private route: ActivatedRoute,
    private mealdb: MealdbApiService,
    private sanitizer: DomSanitizer) {
      // récupération du paramètre d'url :id
      this.mealId = this.route.snapshot.paramMap.get("id");
      
      // requête via le service
      this.meal$ = this.mealdb
        .getMealById(this.mealId)
        .pipe(
          tap((meal: MEALDB_Meal) => {
            console.log(meal);
            this.ingredients = this.getIngredientsArray(meal);
          })
        )

    }

    getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
      //in: "https://www.youtube.com/watch?v=gfhfsBPt46s"
      //out: https://www.youtube.com/embed/gfhfsBPt46s"
      let id = meal.strYoutube.split('=')[1]; // gfhfsBPt46s
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.youtube.com/embed/" + id
      );
    }

    private getIngredientsArray(meal: MEALDB_Meal): string[] {
      let result: string[] = [];

      for (let i=1; i<=20; i++) {
        let value: string = meal["strIngredient" + i];
        if (value != "") result.push(value)
      }

      return result;
    }


}
