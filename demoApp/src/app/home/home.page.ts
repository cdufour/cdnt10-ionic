import { Component } from '@angular/core';

interface Student {
  name: string;
  average: number;
  alternant?: boolean; // propriété optionnelle
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageTitle: string = "Démo";
  students: Student[] = [
    { name: "Clément", average: 14.5, alternant: true },
    { name: "Yasmina", average: 16, alternant: false },
    { name: "Olga", average: 12.4, alternant: true }
  ];
  message: string = "";
  rawHtml: boolean = false;

  constructor() {
    let numAlternants = 0;
    this.students.forEach(student => {
      if (student.alternant) numAlternants++;
    })
    this.message = numAlternants + " étudiants en alternance";
  }

  onClick() {
    this.message += "click";
  }

}
