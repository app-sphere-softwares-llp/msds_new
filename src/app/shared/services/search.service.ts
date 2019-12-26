import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LookUpList} from '../interfaces/lookuplist.type';
import {SearchRequestModal, WercsExtract, WercsExtractSearchModel} from '../interfaces/search.type';


@Injectable()
export class SearchService {
    get searchModal(): WercsExtractSearchModel {
        return this._searchModal;
    }

    set searchModal(value: WercsExtractSearchModel) {
        this._searchModal = value;
    }

    randomUserUrl = 'https://api.randomuser.me/';
    private _searchModal: WercsExtractSearchModel;

    constructor(private http: HttpClient) {
    }

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

    public searchData(modal: SearchRequestModal): Observable<SearchRequestModal> {
        return this.http.post<SearchRequestModal>('http://localhost/msdsapi/api/WercsExtracts/GetPagedData', modal);
    }
}
