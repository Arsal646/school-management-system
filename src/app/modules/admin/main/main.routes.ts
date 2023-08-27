import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MAIN_ROUTES: Routes = [
  {
    path: 'student',
    component: MainComponent,
    loadChildren: () =>
      import('../student/student.routes').then((r) => r.STUDENT_ROUTES),
  },
];
