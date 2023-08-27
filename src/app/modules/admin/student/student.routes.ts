import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./student-list/student-list.component').then(
        (c) => c.StudentListComponent
      ),
  },
];
