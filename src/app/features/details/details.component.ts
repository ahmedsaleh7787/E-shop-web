import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { ProductsData } from '../../core/models/products';
import { GalleriaModule } from 'primeng/galleria';
import { AddtocartService } from '../../shared/components/card/services/addtocart.service';
import { ToastrService } from 'ngx-toastr';

export interface GalleryImage {
  itemImageSrc: string;
  alt: string;
}


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})


export class DetailsComponent implements OnInit {

  id: string | null = null;
  productDetails: ProductsData = {} as ProductsData;
  productImg: GalleryImage[] = [];
  images = this.productImg;

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails();
  }

  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      }
    })
  }

  getProductDetails() {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        console.log("details", res);

        this.productDetails = res.data;

        //for gallery photos
        this.productImg = this.productDetails.images.map((img: string) => ({
          itemImageSrc: img,
          alt: this.productDetails.title
        }));
        this.images = this.productImg;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  //for gallery photos
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];


  //add product to cart
  private addToCartApi = inject(AddtocartService)
  private toster=inject(ToastrService)
  addToCartDetails(id: string) {

    this.addToCartApi.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status==='success'){
          
          this.toster.success(res.message,res.status); 
        }

      },
      error: (err) => {
        console.log(err);

      }
    })

  }
}









