import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successMessage: string = '';
  errorMessage: string = '';
  productImageBase64: string | ArrayBuffer | null = null;

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  })

  private readonly _productsService = inject(ProductsService);


  saveProduct() {
    console.log(this.productForm.value);

    if (this.productForm.invalid || !this.productImageBase64) return;

    const newProductData = {
      title: this.productForm.value.title as string,
      price: this.productForm.value.price as number,
      description: this.productForm.value.description as string,
      category: this.productForm.value.category as string,
      imageBase64: this.productImageBase64.toString()
    }
    debugger

    this._productsService.saveProduct(newProductData).pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Produto salvo com sucesso!';
        this.errorMessage = '';
        this.productForm.reset();
        this.productImageBase64 = null;
      },
      error: (err) => { console.log(err) }
    });
  }

  onFileSelected(event: Event) {
    console.log(event);
    console.log((event.target as HTMLInputElement).files?.[0]);
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.convertFileToBase64(file);
    }

  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageBase64 = e.target.result as string;
      this.productImageBase64 = imageBase64;
      console.log(imageBase64);
    }

    reader.onerror = (error) => {
      this.productImageBase64 = null;
      console.log('Error: ', error);
    }

    reader.readAsDataURL(file);

  }

}
