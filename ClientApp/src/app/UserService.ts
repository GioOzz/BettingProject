import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }) };
import * as crypto from 'crypto-js';
//import { Http, Headers, RequestOptions } from '@angular/http';
const apiUrl = 'https://localhost:4000/Users/'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _http: HttpClient;
  _currentuser: CurrentUser;
  _baseUrl: string;
  _publicKey: any;
  private _privateKey = localStorage.getItem("private");


  constructor(@Inject('BASE_URL') baseUrl: string, private http: HttpClient, currentuser: CurrentUser) {
    this._http = http;
    this._currentuser = currentuser;
    this._baseUrl = baseUrl;
    this.http.get<ConfigKey>(apiUrl + 'GetDbTokenByKey/' + 'PUBLIC_KEY').subscribe((config: any) => { this._publicKey = config.value;});
    localStorage.clear();
  }

  register(username: string, password: string, email: string) {
    var cryptedpsw = crypto.AES.encrypt(crypto.enc.Utf8.parse(password), this._publicKey).toString();
    console.log(cryptedpsw);
    return this.http.post(apiUrl + 'NewUser', {
      username,
      cryptedpsw,
      email
    }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this._baseUrl + 'api/login/Signin', {
      username,
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
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

}

// export class ResourceService {
//   constructor(private http: HttpClient) { }
//   getPublicContent(): Observable<any> {
//     return this.http.get(API_URL + 'all', { responseType: 'text' });
//   }
//   getUserBoard(): Observable<any> {
//     return this.http.get(API_URL + 'user', { responseType: 'text' });
//   }
//   getModeratorBoard(): Observable<any> {
//     return this.http.get(API_URL + 'mod', { responseType: 'text' });
//   }
//   getAdminBoard(): Observable<any> {
//     return this.http.get(API_URL + 'admin', { responseType: 'text' });
//   }
interface ConfigKey {
  IdConfig: Int32Array,
  Key: string,
  Value: string
}