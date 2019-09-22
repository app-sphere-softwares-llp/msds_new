import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { LanguageService } from '../../services/language.service';
import { LookUpObject } from '../../interfaces/lookuplist.type';
import { TranslateService } from '../../services/translate.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    constructor( private themeService: ThemeConstantService,
                 private languageService: LanguageService,
                 private translateService: TranslateService) {}

    searchVisible = false;
    quickViewVisible = false;
    isFolded: boolean;
    isExpand: boolean;
    locales: LookUpObject[];
    defaultLanguage = 'English';

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.languageService.getLookUps().subscribe(data => {
                this.locales = data.Locales;
          });
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    selectLanguage(item: LookUpObject) {
        this.defaultLanguage = item.text;
        this.translateService.use(item.value);
    }
}
