import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { isloggedGuard } from './core/guards/islogged.guard';




export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '', component: AuthLayoutComponent, canActivate: [isloggedGuard], children: [

            { path: 'login', loadComponent:()=>import('../../src/app/core/auth/login/login.component').then((res)=>res.LoginComponent), title: 'Login Page' },
            { path: 'register', loadComponent:()=>import('../../src/app/core/auth/register/register.component').then((res)=>res.RegisterComponent), title: 'Register Page' },
            { path: 'forget', loadComponent:()=>import('../../src/app/core/auth/forgetpassword/forgetpassword.component').then((res)=>res.ForgetpasswordComponent), title: 'forgetPassword' }


        ]
    },

    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [

            { path: 'home', loadComponent:()=>import('../../src/app/features/home/home.component').then((res)=>res.HomeComponent), title: 'Home Page' },
            { path: 'cart',loadComponent:()=>import('../../src/app/features/cart/cart.component').then((res)=>res.CartComponent), title: 'Cart Page' },
            { path: 'products', loadComponent:()=>import('../../src/app/features/products/products.component').then((res)=>res.ProductsComponent), title: 'Products Page' },
            { path: 'brands', loadComponent:()=>import('../../src/app/features/brands/brands.component').then((res)=>res.BrandsComponent), title: 'Brands Page' },
            { path: 'categories', loadComponent:()=>import('../../src/app/features/details/details.component').then((res)=>res.DetailsComponent), title: 'Categories Page' },
            { path: 'details/:slug/:id',loadComponent:()=>import('../../src/app/features/details/details.component').then((res)=>res.DetailsComponent), title: 'Details Page' },
            { path: 'details/:id', loadComponent:()=>import('../../src/app/features/details/details.component').then((res)=>res.DetailsComponent), title: 'Details Page' },
            { path: 'checkout/:cartId', loadComponent:()=>import('../../src/app/features/checkout/checkout.component').then((res)=>res.CheckoutComponent), title: 'Checkout Page' },

        ]
    },

    { path: '**', loadComponent:()=>import('../../src/app/features/notfound/notfound.component').then((res)=>res.NotfoundComponent), title: 'NotFound' }

];
