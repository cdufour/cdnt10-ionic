import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  name: string;
  average: number;
  alternant?: boolean; // propriété optionnelle
  id?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageTitle: string = "Démo";
  students: Student[] = [
    { id: 0, name: "Clément", average: 14.5, alternant: true },
    { id: 1, name: "Yasmina", average: 16, alternant: false },
    { id: 2, name: "Olga", average: 12.4, alternant: true }
  ];
  message: string = "";
  rawHtml: boolean = false;

  constructor(private router: Router) {
    this.countAlternant();
  }

  onClick(studentId: number) {
    // Utilisation du routeur pour changer de page
    this.router.navigate(["/student/" + studentId]);
  }

  onChange(studentName: string) {
    //console.log(studentName);
    for (let i=0; i<this.students.length; i++) {
      if (studentName == this.students[i].name) {
        this.students[i].alternant = !this.students[i].alternant; // true => false 
        break; // sortie de boucle car l'étudiant a été trouvé
      }
    }
    this.countAlternant();
  }

  countAlternant() {
    let numAlternants = 0;
    this.students.forEach(student => {
      if (student.alternant) numAlternants++;
    })
    this.message = numAlternants + " étudiants en alternance";
  }

}
