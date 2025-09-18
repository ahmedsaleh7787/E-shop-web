import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { isloggedGuard } from './core/guards/islogged.guard';
import { ForgetpasswordComponent } from './core/auth/forgetpassword/forgetpassword.component';


export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '', component: AuthLayoutComponent, canActivate: [isloggedGuard], children: [

            { path: 'login', component: LoginComponent, title: 'Login Page' },
            { path: 'register', component: RegisterComponent, title: 'Register Page' },
            { path: 'forget', component: ForgetpasswordComponent, title: 'forgetPassword' }


        ]
    },

    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [

            { path: 'home', component: HomeComponent, title: 'Home Page' },
            { path: 'cart', component: CartComponent, title: 'Cart Page' },
            { path: 'products', component: ProductsComponent, title: 'Products Page' },
            { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories Page' },
            { path: 'details/:slug/:id', component: DetailsComponent, title: 'Details Page' },
            { path: 'details/:id', component: DetailsComponent, title: 'Details Page' },
            { path: 'checkout/:cartId', component: CheckoutComponent, title: 'Checkout Page' },

        ]
    },

    { path: '**', component: NotfoundComponent, title: 'NotFound' }

];
