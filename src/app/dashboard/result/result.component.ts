import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import {
  SearchRequestModal,
  WercsExtract
} from '../../shared/interfaces/search.type';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { NzMessageService, NzNotificationService, NzNotificationServiceModule } from 'ng-zorro-antd';
import { element } from 'protractor';
import { TitleService } from 'src/app/shared/services/title.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private messageService: NzMessageService,
    private notificationService: NzNotificationService,
    private titleService: TitleService
  ) {}

  displayData: WercsExtract[] = []; // You need to change it as well!
  searchModalRequest: SearchRequestModal = new SearchRequestModal();
  isDataInProcess = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  enableExcelDownloadFile = false;
  searchText: string;

  public exportAsExcelFile(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.displayData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'New_Excel');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
 }



  ngOnInit() {
    this.titleService.init();
    this.searchModalRequest.QuerySearchModel = this.searchService.searchModal;
    this.searchModalRequest.pageNumber = 1;
    this.searchModalRequest.pageSize = 50;
    this.getData();
  }

  pageChanged(page: number) {
    this.searchModalRequest.pageNumber = page;
    this.getData();
  }

  pageSizeChanged(size: number) {
    this.searchModalRequest.pageSize = size;
    this.pageSize = size;
    this.getData();
  }

  getData() {
    this.isDataInProcess = true;
    this.searchService.searchData(this.searchModalRequest).subscribe(
      res => {
        this.pageSize = res.pageSize;
        this.total = res.totalCount;
        // tslint:disable-next-line: no-shadowed-variable
        res.Items.forEach(element => {
            element.Path = location.origin + '/assets/pdf/' + element.PDFName;
        });
        this.displayData = res.Items;
        this.isDataInProcess = false;
        this.enableExcelDownloadFile = true;
      },
      error => {
        this.messageService.error(
          'Something Went Wrong, Please try again Later!'
        );
        this.isDataInProcess = false;
      }
    );
  }

  handleSearchEvent(searchText: any)
  {
    console.log(searchText.target.value);
  }

  copyLink(link: WercsExtract) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = location.origin + '/assets/pdf/' + link.PDFName;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notificationService.create(
      '',
      'Link Copied!',
      'Link is Copied to Clipboard! Ready to Paste'
    );
  }

  openPDF(item: WercsExtract): void {

    window.open('../../assets/pdf/' + item.PDFName, '_blank');

  }
}
