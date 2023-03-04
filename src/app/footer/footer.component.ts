import { Component } from '@angular/core';
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private readonly themeService: ThemeService) {
  }

  onChangeTheme(theme: string): void {
    this.themeService.switchTheme(theme)
  }

}
