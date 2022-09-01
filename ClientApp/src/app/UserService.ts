import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
import { environment } from '../environments/environment';
// import * as CryptoJS from 'crypto-js';
//import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _http: HttpClient;
  _currentuser: CurrentUser;
  _baseUrl: string;
  _privateKey: any;

  constructor(@Inject('BASE_URL') baseUrl: string, private http: HttpClient, currentuser: CurrentUser) {
    this._http = http;
    this._currentuser = currentuser;
    this._baseUrl = baseUrl;
    // debugger;
    
    //this._privateKey = environment.PRIVATE_KEY;
    //console.log(this._privateKey);
  }


  
  login(username: string, password: string): Observable<any> {
    // debugger
    return this.http.post(this._baseUrl + 'api/login/Signin', {
      username,
      password
    }, httpOptions);
  }

  // return this.http.get(this._baseUrl + LoginAPI + this.inputCredentals()).subscribe((res: any) => {
  //     if (res.idUser == 1) {
  //         var payload = res;
  //         localStorage.setItem("IdApiUser", res.idUser);
  //         this.trueUser()
  //     }
  //     else
  //         alert("USER FALSISSIMO");
  //     //modal RE-Try
  // });
  register(username: string, password: string, email: string): Observable<any> {

    try {
      //return CryptoJS.AES.encrypt(JSON.stringify(password), dotenv.PRIVATE_KEY).toString();
    } catch (e) {
      console.log(e);
    }
    return this.http.post(this._baseUrl + 'api/login/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  trueUser() {
    //Cookie session https://www.tutorialswebsite.com/how-to-use-cookies-in-angular/#:~:text=What%20is%20Cookies%20in%20Angular%3F%20Cookie%20s%20are,your%20account%20information%20used%20by%20authentication%20for%20example.
    this._currentuser.idUser = localStorage.getItem("IdApiUser");
    //location.replace(this._baseUrl + 'home')
  }

  logout() {
    localStorage.clear(); //delete the cookie session
  }
}

@Injectable()
export class CurrentUser {
  public idUser: any;
  constructor() { }
}

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}

const API_URL = 'http://localhost:44447/api/login/';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}