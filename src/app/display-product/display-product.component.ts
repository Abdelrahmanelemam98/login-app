import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-display-product',
  standalone: true,
  imports: [ProductListComponent, CategoryListComponent, CardComponent],
  templateUrl: './display-product.component.html',
  styleUrl: './display-product.component.scss',
})
export class DisplayProductComponent {}
