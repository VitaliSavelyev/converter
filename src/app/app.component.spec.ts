import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { FilterShowService } from './shared/services/filtershow.service';
import { SharedModule } from './shared/shared.module';


describe('AppComponent', () => {

  let service: FilterShowService
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let de:DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        KeycloakAngularModule,
        HttpClientTestingModule
      ],
      providers: [
        FilterShowService
        , KeycloakService],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainLayoutComponent,
        SearchPageComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    service = TestBed.inject(FilterShowService)
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'my-project'`, () => {
    expect(component.title).toEqual('my-project');
  });
  it('should show search from Output child Elem', () => {
    component.onChanged(true)
    fixture.detectChanges()
    const childHeader = de.query(By.css('.search'))
    expect(childHeader).toBeTruthy()
  })
  it('should position fixed search from Output child Elem', () => {
    component.openSearch = true
    fixture.detectChanges()
    const headerElem = de.query(By.css('header'))
    component.closeSearch(false)
    fixture.detectChanges()
    expect(headerElem.styles.position).toBe('fixed')
  })
});
