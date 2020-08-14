import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class ExamService {

    constructor(
      private http: HttpClient,
    ) { }

    servicePostsfromPostAPI(param: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
        })
        return this.http.get('https://jsonplaceholder.typicode.com/'+param, {headers})
    }  
}
