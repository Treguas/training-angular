import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";
import { first, firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const HAS_TOKEN = _userAuthService.getUserToken();

  if (!HAS_TOKEN) {
    return _router.navigate(["/login"]);
  }

  try {
    //tenta validar o token no backend
    await firstValueFrom(_userService.validateUser());

    //se o usuario esta validado e a rota que ele esta tentando acessar e a de login, redireciona para a pagina de produtos 
    // if (state.url === "/login") {
    //   return _router.navigate(["/products"]);
    // }
    //se o token é valido e a rota nao e a de login, permite o acesso para a rota desejada.
    return true;
  } catch (error) {
    return _router.navigate(["/login"]);
  }

  return true;
}