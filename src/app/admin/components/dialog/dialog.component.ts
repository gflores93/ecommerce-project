import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: AdminProductsService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    /*  title, price, description, category   */
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'], // TODO modify the img
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(
        this.editData.description
      );
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
          },
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
      },
    });
  }
}
