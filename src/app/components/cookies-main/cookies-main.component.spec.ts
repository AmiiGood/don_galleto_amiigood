import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesMainComponent } from './cookies-main.component';

describe('CookiesMainComponent', () => {
  let component: CookiesMainComponent;
  let fixture: ComponentFixture<CookiesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiesMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookiesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
