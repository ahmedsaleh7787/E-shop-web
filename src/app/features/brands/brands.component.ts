import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../core/models/brands';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-brands',
  imports: [CardModule, ButtonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private BrandsService = inject(BrandsService)
  ourBrands: Brands[] = []
  ngOnInit(): void {
    this.getBrands();

  }


  getBrands() {
    this.BrandsService.getBrands().subscribe({
      next: (res) => {
        this.ourBrands = res.data;
        console.log(this.ourBrands);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
