import { Component, Input, OnInit, inject } from '@angular/core';
import { ClassFilterForm, Student } from '../student-model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldsChangesFrom, StudentService } from './../student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class StudentTableComponent implements OnInit {
  fb = inject(FormBuilder);
  public studentService = inject(StudentService);
  dialog = inject(MatDialog);
  utilitiesService = inject(UtilitiesService);
  students!: Student[];
  editMode = false;
  filterDataRecord!: ClassFilterForm;
  hasfilterDataChanged = false;

  @Input() set filterData(value: ClassFilterForm) {
    this.hasfilterDataChanged = true;
    if (value) {
      this.filterDataRecord = value;
      this.filterStudents(value);
    }
  }

  @Input() set ManualtriggeredFilter(value: number) {
    if (value && !this.hasfilterDataChanged) {
      this.getStudentData();
      this.filterStudents(this.filterDataRecord);
    }
    this.hasfilterDataChanged = false;
  }

  editForm!: FormGroup;
  filterTypes: string[] = ['Primary', 'Secondary'];
  displayedColumns: string[] = [
    'serial',
    'name',
    'filterType',
    'year',
    'className',
    'actions',
  ];
  dataSource!: Student[];

  ngOnInit(): void {
    this.getStudentData();
    this.dataSource = this.students;
    this.formInit();

    this.editForm?.get('filterType')?.valueChanges.subscribe((filterType) => {
      this.studentService.dropdownAvailableYear(
        filterType,
        FieldsChangesFrom.EDIT
      );
      this.editForm?.get('year')?.setValue(null);
    });

    this.editForm?.get('year')?.valueChanges.subscribe((selectedYear) => {
      const selectedFilterType = this.editForm?.value?.filterType;
      this.studentService.dropdownAvailableClass(
        selectedYear,
        selectedFilterType,
        FieldsChangesFrom.EDIT
      );
      this.editForm?.get('className')?.setValue(null);
    });
  }

  formInit() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      filterType: ['', Validators.required],
      year: [null, Validators.required],
      className: ['', Validators.required],
    });
  }

  getStudentData() {
    this.students = this.studentService.getStudents();
  }

  filterStudents(filterData: ClassFilterForm) {
    const selectedFilterType = filterData?.type;
    const selectedYear = filterData?.year;
    const selectedClass = filterData?.class;

    const filteredStudents = this.students?.filter((student) => {
      if (selectedFilterType && !selectedYear && !selectedClass) {
        return student.filterType === selectedFilterType;
      } else if (selectedFilterType && selectedYear && !selectedClass) {
        return (
          student.filterType === selectedFilterType &&
          student.year === selectedYear
        );
      } else if (selectedFilterType && selectedYear && selectedClass) {
        return (
          student.filterType === selectedFilterType &&
          student.year === selectedYear &&
          student.className === selectedClass
        );
      }

      // If none of the conditions match, return students
      return this.students;
    });

    // Filter out deleted students
    this.dataSource = filteredStudents?.filter((s: Student) => !s.isDeleted);
  }

  editStudent(student: Student) {
    this.setFormValue(student);
    student.editMode = true;
  }

  saveStudent(student: Student) {
    const updatedStudent = this.editForm.value;

    if (this.editForm.valid) {
      Object.assign(student, updatedStudent);
      student.editMode = false;
      const msg = `"${updatedStudent.name}" has been updated suucessfully.`;
      this.utilitiesService.showSuccessToast(msg);
    } else {
      this.utilitiesService.checkValidations(this.editForm);
    }

    //Apply filter again
    //  this.filterStudents(this.filterDataRecord);
  }

  cancelEdit(student: Student) {
    student.editMode = false;
  }

  delete(student: Student) {
    student.isDeleted = true;

    // Filter out deleted students
    const filteredDataSource = this.dataSource.filter(
      (s: Student) => !s.isDeleted
    );

    // Update dataSource to refresh the MatTable
    this.dataSource = filteredDataSource;
    const msg = `"${student.name}" has been deleted successfully.`;
    this.utilitiesService.showSuccessToast(msg);
  }

  viewStudent(student: Student) {
    this.dialog.open(StudentDetailsComponent, {
      data: { studentDetail: student },
      maxWidth: '70vw',
      width: '70vw',
      minHeight: '40vh',
      height: 'auto',
    });
  }

  //Setting up form value
  setFormValue(student: Student) {
    Object.keys(this.editForm.value).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(student, key)) {
        this.editForm.get(key)?.setValue(student[key as keyof Student]);
      }
    });
  }
}
