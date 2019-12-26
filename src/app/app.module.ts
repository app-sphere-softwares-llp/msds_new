import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { TranslateService } from './shared/services/translate.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




registerLocaleData(en);
export function setupTranslateFactory(
    service: TranslateService): Function {
    return () => service.use('en');
  }
@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        AppRoutingModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        Ng2SearchPipeModule


    ],
    providers: [
        { 
            provide: NZ_I18N,
            useValue: en_US, 
        },
        TranslateService,
        {
          provide: APP_INITIALIZER,
          useFactory: setupTranslateFactory,
          deps: [ TranslateService ],
          multi: true
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
