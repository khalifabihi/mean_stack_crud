import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  addStudent: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private routes: Router,
    private studentService: StudentsService,
    private url: ActivatedRoute
    ) {
    this.addStudent = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.studentService.singleStudent(this.id).subscribe((data) => {
      console.log(data);
      this.addStudent.patchValue(data);
    });
  }

  onSubmit() {
    console.log(this.addStudent.value);
    this.studentService.updateStudent(this.id, this.addStudent.value).subscribe((data:any) => {
      console.log(data);
      this.routes.navigate(['/list-students'])
    })
  }
}
