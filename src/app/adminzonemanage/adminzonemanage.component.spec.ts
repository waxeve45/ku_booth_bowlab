import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminzonemanageComponent } from './adminzonemanage.component';

describe('AdminzonemanageComponent', () => {
  let component: AdminzonemanageComponent;
  let fixture: ComponentFixture<AdminzonemanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminzonemanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminzonemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
