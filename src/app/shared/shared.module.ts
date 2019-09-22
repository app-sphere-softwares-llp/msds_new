import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { CodeBoxComponent } from './directives/code-box.component';
import { SearchService } from './services/search.service';
import { LanguageService } from './services/language.service';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { TitleService } from './services/title.service';


@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        SearchPipe,
        CodeBoxComponent,
        TranslatePipe
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgZorroAntdModule,
        PerfectScrollbarModule
    ],
    declarations: [
        CodeBoxComponent,
        SearchPipe,
        TranslatePipe
    ],
    providers: [
        ThemeConstantService,
        SearchService,
        LanguageService,
        TranslateService,
        TitleService

    ]
})

export class SharedModule { }
