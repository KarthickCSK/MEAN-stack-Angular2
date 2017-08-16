import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { UserModule } from '../modules/user/user.module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NavbarService {

	constructor( private http: Http ) { }
	private addUserUrl = 'http://localhost:3000/user/addUser';

	// Implement a method to get the public deals

	addNewUser(newUser) 
	{

		return this.http
		.get(this.addUserUrl)
		.toPromise()
		.then(response=>response)
		.catch(this.handleError);
	}

	// Implement a method to handle errors if any
	private handleError(error: any): Promise<any> 
	{
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
