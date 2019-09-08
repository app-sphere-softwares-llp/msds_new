import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { LookUpList } from '../../shared/interfaces/lookuplist.type';
import { WercsExtract } from '../../shared/interfaces/search.type';

@Component({
    templateUrl: './default-dashboard.component.html'
})

export class DefaultDashboardComponent implements OnInit {

    constructor( private searchService: SearchService) { }

    dateFormat = 'dd MMM yyyy';
    public selectedValue: any;
    lookUpList: LookUpList;
    public fmcBusiness: any;
    public languages: any;
    public formats: any;
    public subFormats: any;
    public searchModel: WercsExtract;
    public selectedDateType: any;

    constructor()
    {
        this.searchModel = new Wercs
    }

    ngOnInit() {
        this.selectedDateType =  'A';
        this.searchService.getLookUps().subscribe(data => {
            this.lookUpList = data;
            this.fmcBusiness = this.lookUpList.FMCBusiness;
            this.languages = this.lookUpList.Languages;
            this.formats = this.lookUpList.Formats;
            this.subFormats = this.lookUpList.SubFormats;
        });

    }

}
