import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookUpList } from '../interfaces/lookuplist.type';
import { WercsExtract } from '../interfaces/search.type';



@Injectable()
export class SearchService {
    randomUserUrl = 'https://api.randomuser.me/';
    constructor(private http: HttpClient) {}

    public getLookUps(): Observable<LookUpList> {
        return this.http.get<LookUpList>('./assets/data/lookup.json');
    }

    // tslint:disable-next-line: max-line-length
    public getSearchData(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
        let params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('results', `${pageSize}`)
        .append('sortField', sortField)
        .append('sortOrder', sortOrder);
        genders.forEach(gender => {
            params = params.append('gender', gender);
        });
        return this.http.get(`${this.randomUserUrl}`, {
            params
        });
    }

}