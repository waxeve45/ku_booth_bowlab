import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminapprovalComponent } from './adminapproval.component';

describe('AdminapprovalComponent', () => {
  let component: AdminapprovalComponent;
  let fixture: ComponentFixture<AdminapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminapprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
