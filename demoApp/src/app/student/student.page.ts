import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  studentId: string = "";
  student: Student | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get("id");

      this.studentService
        .findById(parseInt(this.studentId))
        .subscribe((student: Student) => {
          this.student = student;
        })

    })
  }

}
