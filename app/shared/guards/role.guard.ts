import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  canActivate() {
    return this.isAdmin();
  }

  isAdmin():boolean{
    let token = localStorage.getItem("token");

    // Decodificar el token JWT
    const decodedToken: any = jwtDecode(token);

    return decodedToken.roleName === "Admin" ? true : false;
  }
}
