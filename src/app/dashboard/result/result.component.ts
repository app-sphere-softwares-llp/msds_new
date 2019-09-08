import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../shared/services/search.service';
import {SearchRequestModal} from '../../shared/interfaces/search.type';

@Component({
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
    constructor(private searchService: SearchService) {
    }

    nameList = [
        {text: 'Joe', value: 'Joe', byDefault: true},
        {text: 'Jim', value: 'Jim'}
    ];
    addressList = [
        {text: 'London', value: 'London', byDefault: true},
        {text: 'Sidney', value: 'Sidney'}
    ];
    sortName = null;
    sortValue = null;
    listOfSearchName = ['Joe', 'London']; // You need to change it as well!
    searchAddress: string;
    data = [
        {
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];
    displayData = []; // You need to change it as well!
    searchModalRequest: SearchRequestModal = new SearchRequestModal();

    ngOnInit() {
        this.searchModalRequest.QuerySearchModel = this.searchService.searchModal;
        this.searchModalRequest.pageNumber = 1;
        this.searchModalRequest.pageSize = 10;
        this.getData();
    }

    getData() {
        this.searchService.searchData(this.searchModalRequest).subscribe(res => {
            debugger;
        }, error => {
            debugger;
        });
    }

    sort(sort: { key: string; value: string }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
    }

    filter(listOfSearchName: string[], searchAddress: string): void {
        this.listOfSearchName = listOfSearchName;
        this.searchAddress = searchAddress;
        this.search();
    }

    search(): void {
        /** filter data **/
        const filterFunc = item =>
            (this.searchAddress
                ? item.address.indexOf(this.searchAddress) !== -1
                : true) &&
            (this.listOfSearchName.length
                ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
                : true);
        const data = this.data.filter(item => filterFunc(item));
        /** sort data **/
        if (this.sortName && this.sortValue) {
            this.displayData = data.sort((a, b) =>
                this.sortValue === 'ascend'
                    ? a[this.sortName] > b[this.sortName]
                    ? 1
                    : -1
                    : b[this.sortName] > a[this.sortName]
                    ? 1
                    : -1
            );
        } else {
            this.displayData = data;
        }
    }
}
