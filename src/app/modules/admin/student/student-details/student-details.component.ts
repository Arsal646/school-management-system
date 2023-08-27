import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../student-model';
import { NgIf } from '@angular/common';

export interface detailMatDialogData {
  studentDetail: Student;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class StudentDetailsComponent {
  studentDetail!: Student;
  constructor(
    public dialogRef: MatDialogRef<StudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: detailMatDialogData
  ) {
    this.studentDetail = this.data.studentDetail;
  }

  closeForm() {
    this.dialogRef.close();
  }
}
