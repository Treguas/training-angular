import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";
import { first, firstValueFrom } from "rxjs";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const HAS_TOKEN = _userAuthService.getUserToken();
  //se nao tem token, permite o acesso a pagina de login
  if (!HAS_TOKEN) {
    return true;
  }

  try {
    await firstValueFrom(_userService.validateUser());
    //token valido, redireciona para a pagina de produtos
    return _router.navigate(["/products"]);
  } catch (error) {
    //token invalido, permite o acesso a pagina de login
    return true;
    
  }

}