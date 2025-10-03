import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const _userAuthService = inject(UserAuthService);

  const HAS_TOKEN = _userAuthService.getUserToken();

  if (HAS_TOKEN) {
    const clonedReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${HAS_TOKEN}`)
    });
    return next(clonedReq);
  }
  
  return next(req);

}