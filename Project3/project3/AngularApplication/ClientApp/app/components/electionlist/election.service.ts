import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Election } from "./election.interface";
import { Representative } from "./representative.interface";
import { Upcomingelection } from "./upcomingelection.interface";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ElectionService {

    constructor(private http: Http) { }

    getElectionList(): Observable<Election> {
        return this.http.get('https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDY1GJAJEXnDPXZLt_qyNAPyKvM2PFaneg')
            .map(response => response.json() as Election);

    }
    getUpComingElectionList(searchString: string): Observable<Upcomingelection> {
        return this.http.get('https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDY1GJAJEXnDPXZLt_qyNAPyKvM2PFaneg&address=' + searchString)
            .map(response => response.json() as Upcomingelection);

    }

    getUpComingElectionDetails(searchString: string,electionid: number): Observable<Upcomingelection> {
        return this.http.get('https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDY1GJAJEXnDPXZLt_qyNAPyKvM2PFaneg&address=' + searchString + '&electionId='+electionid)
            .map(response => response.json() as Upcomingelection);

    }

    getRepresentativeList(searchString: string): Observable<Representative> {
        return this.http.get('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDY1GJAJEXnDPXZLt_qyNAPyKvM2PFaneg&address=' +searchString)
            .map(response => response.json() as Representative);

    }
    //getPokemon(nameOrId: string): Observable<Pokemon> {
      //  return this.http.get('https://pokeapi.co/api/v2/pokemon/' + name)
        //    .map(response => response.json() as Pokemon);

}