import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClassFilterForm, ClassModel } from '../student-model';
import { FieldsChangesFrom, StudentService } from '../student.service';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-student-filter',
    templateUrl: './student-filter.component.html',
    styleUrls: ['./student-filter.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NgFor,
        MatOptionModule,
        AsyncPipe,
    ],
})
export class StudentFilterComponent implements OnInit {
  public studentService = inject(StudentService);
  @Output() filterChanged = new EventEmitter<ClassFilterForm>();
  form!: FormGroup;
  filterTypes: string[] = ['Primary', 'Secondary'];
  availableYears: number[] = [];
  availableClasses: string[] = [];
  classesData: ClassModel[] = [];
  fb = inject(FormBuilder);

  ngOnInit() {
    this.formInit();
    this.classesData = this.studentService.getClassData();

    this.form?.get('type')?.valueChanges.subscribe((filterType) => {
      this.studentService.dropdownAvailableYear(filterType,FieldsChangesFrom.FILTER)
      this.form?.get('year')?.setValue(null);
    });

    this.form?.get('year')?.valueChanges.subscribe((selectedYear) => {
      const selectedFilterType = this.form?.value?.type;
      this.studentService.dropdownAvailableClass(selectedYear,selectedFilterType,FieldsChangesFrom.FILTER)
      this.form?.get('class')?.setValue(null);
    });
  }

  formInit() {
    this.form = this.fb.group({
      type: '',
      year: '',
      class: '',
    });
  }

  applyFilters() {
    const form = this.form.value;
    this.filterChanged.emit(form);
  }

  clearAll() {
    this.form.reset();
  }
}
