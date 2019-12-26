import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from "@angular/core";
import { SearchService } from "../../shared/services/search.service";
import { LookUpList } from "../../shared/interfaces/lookuplist.type";
import { WercsExtractSearchModel } from "../../shared/interfaces/search.type";
import { NzNotificationService } from "ng-zorro-antd";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./default-dashboard.component.html"
})
export class DefaultDashboardComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private notificationService: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  dateFormat = "dd MMM yyyy";
  public selectedValue: any;
  lookUpList: LookUpList;
  public fmcBusiness: any;
  public languages: any;
  public formats: any;
  public subFormats: any;
  public validityAreas: any;
  public searchModel = new WercsExtractSearchModel();
  public showRangeFilter: boolean;
  public isDaysOptionSelected: boolean;
  public dateRange: any;

  ngOnInit() {
   
    this.searchModel.SelectedDateType = "A";
    this.searchModel.PublishDateFilter.LastPublishDays = 15;
    this.searchModel.RevisionDateFilter.LastRevisionDays = 15;
    this.searchModel.ProductOptionCondition = "Contains";
    this.searchModel.PublishDateFilter.FilterType = "Range";
    this.showRangeFilter = true;
    this.isDaysOptionSelected = false;
    this.notificationService.config({
      nzPlacement: "bottomRight"
    });
    this.searchService.getLookUps().subscribe(data => {
      this.lookUpList = data;
      this.fmcBusiness = this.lookUpList.FMCBusiness;
      this.languages = this.lookUpList.Languages;
      this.formats = this.lookUpList.Formats;
      this.subFormats = this.lookUpList.SubFormats;
      this.validityAreas = this.lookUpList.ValidityAreas;
    });

    if (this.searchService.searchModal) {
      this.searchModel = this.searchService.searchModal;
      if (
        this.searchModel.PublishDateFilter.FilterType === "Range" &&
        this.searchModel.PublishDateFilter.StartDate
      ) {
        this.showRangeFilter = true;
      }
      if (
        this.searchModel.RevisionDateFilter.FilterType === "Range" &&
        this.searchModel.RevisionDateFilter.StartDate
      ) {
        this.showRangeFilter = true;
      }
    }

    this.searchModel.FMCBusiness = "";
    this.searchModel.Language = "";
    this.searchModel.WercsSubFormat = "";
    this.searchModel.ValidityArea = "";
  }

  onChange(result: Date): void {
    // Check if this is for Range Filter
    if (this.showRangeFilter) {
      // Check if this a Published
      if (this.searchModel.SelectedDateType === 'A') {
        this.searchModel.RevisionDateFilter.FilterType = this.searchModel.PublishDateFilter.FilterType;
        this.searchModel.RevisionDateFilter.StartDate = result[0];
        this.searchModel.RevisionDateFilter.EndDate = result[1];
        this.searchModel.PublishDateFilter.StartDate = null;
        this.searchModel.PublishDateFilter.EndDate = null;
      } else {
        this.searchModel.PublishDateFilter.StartDate = result[0];
        this.searchModel.PublishDateFilter.EndDate = result[1];
        this.searchModel.RevisionDateFilter.StartDate = null;
        this.searchModel.RevisionDateFilter.EndDate = null;
      }
      this.searchModel.StartDate = result[0];
      this.searchModel.EndDate = result[1];
    } else {
      if (this.searchModel.SelectedDateType === 'A') {
        this.searchModel.RevisionDateFilter.FilterType = this.searchModel.PublishDateFilter.FilterType;
        this.searchModel.RevisionDateFilter.StartDate = result;
        this.searchModel.PublishDateFilter.StartDate = null;
      } else {
        this.searchModel.PublishDateFilter.StartDate = result;
        this.searchModel.RevisionDateFilter.StartDate = null;
      }
    }
    console.log("onChange: ", result);
  }

  onConditionChange(e): void {
    this.showRangeFilter = e === "Range";
    this.searchModel.RevisionDateFilter.StartDate = null;
    this.searchModel.RevisionDateFilter.EndDate = null;
    this.searchModel.PublishDateFilter.StartDate = null;
    this.searchModel.PublishDateFilter.EndDate = null;
  }

  onDateTypeChange(e): void {
    this.searchModel.RevisionDateFilter.StartDate = null;
    this.searchModel.RevisionDateFilter.EndDate = null;
    this.searchModel.PublishDateFilter.StartDate = null;
    this.searchModel.PublishDateFilter.EndDate = null;
  }

  onDaysOptionClicked(e): void {
    if (e) {
      this.searchModel.RevisionDateFilter.StartDate = null;
      this.searchModel.RevisionDateFilter.EndDate = null;
      this.searchModel.PublishDateFilter.StartDate = null;
      this.searchModel.PublishDateFilter.EndDate = null;
    }

    this.isDaysOptionSelected = e;
  }

  search(): void {
    this.searchService.searchModal = this.searchModel;
    this.router.navigateByUrl("/dashboard/result");
  }

  reset(): void {
    this.searchModel = new WercsExtractSearchModel();
    this.searchModel.SelectedDateType = "A";
    this.searchModel.PublishDateFilter.FilterType = "Equals";
    this.isDaysOptionSelected = false;
    this.showRangeFilter = false;
    this.notificationService.create(
      "",
      "Reset is Done",
      "All Filters are reset!"
    );
  }
}
