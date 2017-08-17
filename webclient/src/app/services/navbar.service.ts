import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserModule } from '../modules/user/user.module';

// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NavbarService {

	constructor( private http: Http ) { }
	private addUserUrl = 'http:+//localhost:3000/user/addUser';

	/// Add a new comment
    registerNewUser (body: Object): Observable<UserModule[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.addUserUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }  
     
    // Displays the error message
    private handleError(error: Response | any) {
        let errorMessage: string;
 
        errorMessage = error.message ? error.message : error.toString();
 
        // In real world application, call to log error to remote server
        // logError(error);
 
        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }
}
