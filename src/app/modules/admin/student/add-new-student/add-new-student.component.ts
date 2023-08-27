import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassFilterForm } from '../student-model';

export interface matData {
  filterDataRecord: ClassFilterForm;
}

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    AsyncPipe,
  ],
})
export class AddNewStudentComponent implements OnInit {
  form!: FormGroup;
  public studentService = inject(StudentService);
  private utilitiesService = inject(UtilitiesService);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: matData
  ) {}
  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      filterType: [
        { value: this.data?.filterDataRecord?.type || '', disabled: true },
        Validators.required,
      ],
      year: [
        { value: this.data?.filterDataRecord?.year || '', disabled: true },
        Validators.required,
      ],
      className: [
        { value: this.data?.filterDataRecord?.class || '', disabled: true },
        Validators.required,
      ],
      subject1: '',
      subject2: '',
      subject3: '',
      image: '',
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  saveStudent() {
    const form = this.form.getRawValue();
    if (this.form.valid) {
      this.dialogRef.close(form);
    } else {
      this.utilitiesService.checkValidations(this.form);
    }
  }

  imageUpload(event: Event): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.form.patchValue({
          image: reader.result,
        });
      };
    }
  }
}
