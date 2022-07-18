import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenDecoderService {

  private token: string;

  constructor(private tokenStorageService: TokenStorageService) {
    this.token = this.tokenStorageService.getToken();
  }

  private getDecodedToken(): any {
    try{
        return jwt_decode(this.token);
    }
    catch(Error){
        return null;
    }
  }

  public getId(): number {
    let decodedToken = this.getDecodedToken();

    if(decodedToken === null) {
      return 0;
    }
    return parseInt(this.getDecodedToken().id);
  }

  public getUsername(): string {
    let decodedToken = this.getDecodedToken();

    if(decodedToken === null) {
      return "";
    }
    return this.getDecodedToken().username;
  }

  public getRoles(): Array<string> {
    let decodedToken = this.getDecodedToken();

    if(decodedToken === null) {
      return [];
    }
    return this.getDecodedToken().roles;
  }

  /**
   * To check if the current user is authenticated
   * Check the token, and it's validity
   * 
   * @return {boolean} true if user is authenticated
   */
  public isAuthenticated(): boolean {
    try{
      const token = this.tokenStorageService.getToken();
      const roles = this.getRoles();
      const login = this.getUsername();
      const dateNow = new Date();
      return token !== "" 
        && roles.length > 0
        && login !== "";
    } catch {
      return false
    }
  }
}
