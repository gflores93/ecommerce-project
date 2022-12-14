import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryInterface } from 'src/app/shared/models/category.interface';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AdminProductsService } from '../../../services/admin-products.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  categories: CategoryInterface[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: AdminProductsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories: CategoryInterface[]) => {
        this.categories = categories;
      });

    /*  title, description, categoryId, price, active, image   */
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [1, Validators.required],
      price: ['', Validators.required],
      active: [true],
      image: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'] // TODO modify the img
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['description'].setValue(
        this.editData.description
      );
      this.productForm.controls['categoryId'].setValue(
        this.editData.categoryId
      );
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['image'].setValue(this.editData.image);
      this.productForm.controls['active'].setValue(this.editData.active);
    }
  }

  addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error while adding the product');
          }
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Error while updating the record');
      }
    });
  }

  // getFormValidationErrors() {
    
  //   console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');
  
  //   let totalErrors = 0;
  
  //   Object.keys(this.productForm.controls).forEach(key => {
  //     const controlErrors: ValidationErrors = this.productForm.get(key).errors;
  //     if (controlErrors != null) {
  //        totalErrors++;
  //        Object.keys(controlErrors).forEach(keyError => {
  //          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
  //         });
  //     }
  //   });
  
  //   console.log('Number of errors: ' ,totalErrors);
  // }

}
