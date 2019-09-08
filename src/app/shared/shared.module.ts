import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { CodeBoxComponent } from './directives/code-box.component';
import { SearchService } from './services/search.service';


@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        SearchPipe,
        CodeBoxComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgZorroAntdModule,
        PerfectScrollbarModule
    ],
    declarations: [
        CodeBoxComponent,
        SearchPipe
    ],
    providers: [
        ThemeConstantService,
        SearchService
       
    ]
})

export class SharedModule { }
