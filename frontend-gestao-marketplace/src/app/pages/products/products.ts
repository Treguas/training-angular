import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProducts } from '../../interfaces/products';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  private readonly _productsService = inject(ProductsService);
  productsList: IProducts[] = [];
  filteredProductsList: IProducts[] = [];

  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl('')
  });

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
        this.productsList = response.data;
        this.filteredProductsList = response.data;
      },
      error: (err) => { console.log(err) }
    });
  }

  filterProducts() {
    const title = this.filterForm.value.title?.toLowerCase();
    const status = this.filterForm.value.status?.toLowerCase();

    console.log(title, status);

    this.filteredProductsList = this.productsList.filter((product) => 
      (!title || product.title.toLowerCase().includes(title)) &&
      (!status || product.status.toLowerCase().includes(status)) 
     
    );
    console.log(this.filteredProductsList);
  }

  clearFilter() {
    this.filterForm.reset();
    this.filteredProductsList = this.productsList;
    this.filterForm.get('status')?.setValue('');

  }

}
