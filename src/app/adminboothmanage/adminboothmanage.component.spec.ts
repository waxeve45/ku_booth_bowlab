import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminboothmanageComponent } from './adminboothmanage.component';

describe('AdminboothmanageComponent', () => {
  let component: AdminboothmanageComponent;
  let fixture: ComponentFixture<AdminboothmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminboothmanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminboothmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
