import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClassModel, Student } from './student-model';
import { CLASS_MODEL, STUDENTS } from './student';

export enum FieldsChangesFrom {
  EDIT = 'from_edit',
  FILTER = 'from_filter',
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  classesData: ClassModel[] = CLASS_MODEL;
  students: Student[] = STUDENTS;
  availableYear = new BehaviorSubject<number[]>([]);
  availableClasses = new BehaviorSubject<string[]>([]);
  availableYearEditRow = new BehaviorSubject<number[]>([]);
  availableClassesEditRow = new BehaviorSubject<string[]>([]);

  getFilterTypes(): Observable<string[]> {
    const filterTypes = this.classesData.map((item) => item.filterType);
    const uniqueFilterTypes = [...new Set(filterTypes)];
    return of(uniqueFilterTypes);
  }

  getYears(): Observable<number[]> {
    const years = this.classesData.map((item) => item.year);
    const uniqueYears = [...new Set(years)];
    return of(uniqueYears);
  }

  getClasses(): Observable<string[]> {
    const uniqueClasses = this.classesData.flatMap((item) => item.classes);
    const finalUniqueClasses = [...new Set(uniqueClasses)];
    return of(finalUniqueClasses);
  }

  getGrade(): Observable<string[]> {
    const grade = ['A', 'B', 'C', 'D', 'E', 'F'];
    return of(grade);
  }

  getStudents() {
    return this.students;
  }

  addNewStudent(student: Student) {
    this.students.unshift(student);
  }

  getClassData(): ClassModel[] {
    return this.classesData;
  }

  dropdownAvailableYear(filterType: string, key: string) {
    const availableYear = this.classesData
      .filter((data) => data?.filterType === filterType)
      .map((data) => data.year);

    if (key === FieldsChangesFrom.EDIT) {
      this.availableYearEditRow.next(availableYear);
    } else if (key === FieldsChangesFrom.FILTER) {
      this.availableYear.next(availableYear);
    }
  }

  dropdownAvailableClass(
    selectedYear: number,
    selectedFilterType: string,
    key: string
  ) {
    console.log(selectedYear, selectedFilterType);
    const availableClasses =
      this.classesData.find(
        (data) =>
          data.year === selectedYear && data.filterType === selectedFilterType
      )?.classes || [];
    if (key === FieldsChangesFrom.EDIT) {
      this.availableClassesEditRow.next(availableClasses);
    } else if (key === FieldsChangesFrom.FILTER) {
      this.availableClasses.next(availableClasses);
    }
  }
}
