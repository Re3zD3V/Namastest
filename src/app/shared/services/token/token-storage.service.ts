import { Injectable } from '@angular/core';
import { CookieService, SameSite } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private name: string;
  private expires: number | Date;
  private path: string;
  private domain: string;
  private secure: boolean;
  private sameSite: SameSite;

  //name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict'

  constructor(private cookieService:CookieService) {
    this.name = "JWT";
    this.expires = null;
    this.path = null;
    this.domain = null;
    this.secure = true;
    this.sameSite = null;
  }

  getToken(): string {
    return this.cookieService.get(this.name);
  }

  setToken(token: string): void {
    this.cookieService.set(this.name, token, this.expires, this.path, this.domain, this.secure, this.sameSite);
  }

  deleteToken(): void {
    this.cookieService.delete(this.name);
  }
}
