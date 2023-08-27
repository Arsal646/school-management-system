import { Component, inject } from '@angular/core';
import { ClassFilterForm } from '../student-model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNewStudentComponent } from '../add-new-student/add-new-student.component';
import { StudentService } from '../student.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { StudentTableComponent } from '../student-table/student-table.component';
import { StudentFilterComponent } from '../student-filter/student-filter.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  standalone: true,
  imports: [StudentFilterComponent, StudentTableComponent, MatDialogModule],
})
export class StudentListComponent {
  filterData: ClassFilterForm = { type: '', year: 0, class: '' };
  private studentService = inject(StudentService);
  private utilitiesService = inject(UtilitiesService);
  dialog = inject(MatDialog);
  ManualtriggeredFilter!: number;

  handleFilterChange(filterData: ClassFilterForm) {
    this.filterData = filterData;
    this.ManualtriggeredFilter = Math.random();
  }

  addNewStudent() {
    const missingFields = [];

    if (!this.filterData.type) {
      missingFields.push('"Filter Type"');
    }
    
    if (!this.filterData.year) {
      missingFields.push('"Year"');
    }
    
    if (!this.filterData.class) {
      missingFields.push('"Class"');
    }

    if (missingFields.length > 0) {
      const errorMsg = `Please select ${missingFields.join(' and ')} and click filter button`;
      this.utilitiesService.showErrorToast(errorMsg,1000);
      return;
    }

    const dialogRef = this.dialog.open(AddNewStudentComponent, {
      data: { filterDataRecord: this.filterData },
      maxWidth: '70vw',
      width: '70vw',
      minHeight: '40vh',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentService.addNewStudent(result);
        this.utilitiesService.showSuccessToast('Student added successfully.');
        this.ManualtriggeredFilter = Math.random();
      }
    });
  }
}
