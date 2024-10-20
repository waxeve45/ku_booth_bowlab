import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbookingreportComponent } from './adminbookingreport.component';

describe('AdminbookingreportComponent', () => {
  let component: AdminbookingreportComponent;
  let fixture: ComponentFixture<AdminbookingreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminbookingreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminbookingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
