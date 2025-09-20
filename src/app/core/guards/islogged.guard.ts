
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'; 
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const isloggedGuard: CanActivateFn = (route, state) => {

const router:Router=inject(Router)
const cookieService=inject(CookieService) 


const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true
  }


if(cookieService.get("token")){

    return router.parseUrl ('/home')
  
}

  return true


};
