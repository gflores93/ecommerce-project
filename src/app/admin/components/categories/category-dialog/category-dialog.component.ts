import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryInterface } from 'src/app/shared/models/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AdminCategoriesService } from '../../../services/admin-categories.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  actionBtn: string = 'Save';
  categories: CategoryInterface[] = [];
  validCategory: boolean = true;
  categoryName?: AbstractControl;
  newCategory: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: AdminCategoriesService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories: CategoryInterface[]) => {
        this.categories = categories;
      });

    /*  name, description   */
    this.categoryForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        active: [true],
        imgUrl: [
          'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        ] // TODO modify the img
      },
      { validators: this.validateCategory }
    );
    this.categoryName = this.categoryForm.controls['name'];

    if (this.editData) {
      this.actionBtn = 'Update';
      this.categoryForm.controls['name'].setValue(this.editData.name);
      this.categoryForm.controls['description'].setValue(
        this.editData.description
      );
      this.categoryForm.controls['active'].setValue(this.editData.active);
      this.categoryForm.controls['imgUrl'].setValue(this.editData.imgUrl);
    }
  }

  addCategory(): void {
    if (!this.editData) {
      if (this.categoryForm.valid && !this.checkCategory()) {
        this.api.postCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            alert('Category added successfully');
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error while adding the category');
          }
        });
      }
    } else {
      this.updateCategory();
    }
  }

  updateCategory() {
    if (this.categoryForm.valid && !this.checkCategory(this.editData.id)) {
      this.api
        .putCategory(this.categoryForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            alert('Category updated successfully');
            this.categoryForm.reset();
            this.dialogRef.close('update');
          },
          error: (err) => {
            alert('Error while updating the record');
          }
        });
    }
  }

  checkCategory(id: number = 0): boolean {
    this.newCategory = this.categoryForm.value.name;
    const categoryName = this.categoryForm.value.name.toLowerCase();
    console.log(categoryName, id);
    const existingCategory = this.categories.find(
      (c) => c.name.toLowerCase() === categoryName
    );
    const alreadyExists = existingCategory?.name.toLowerCase() === categoryName;
    if (alreadyExists && existingCategory?.id !== id) {
      this.validCategory = false;
      this.categoryForm.controls['name'].setValue(id ? this.editData.name : '');
      return true;
    }
    return false;
  }

  validateCategory: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    if (group.value.name?.length) this.validCategory = true;
    return this.validCategory ? null : { alreadyExists: true };
  };
}
