import { Component } from '@angular/core';
import { TranslateService } from './shared/services/translate.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.use('en').then(() => {
          console.log(translate.data);
        });
      }
}
