import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookUpList } from '../interfaces/lookuplist.type';



@Injectable()
export class SearchService {
    constructor(private http: HttpClient) {}

    public getLookUps(): Observable<LookUpList> {
        return this.http.get<LookUpList>('./assets/data/lookup.json');
    }
}