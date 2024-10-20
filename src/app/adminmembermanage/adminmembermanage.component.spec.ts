import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmembermanageComponent } from './adminmembermanage.component';

describe('AdminmembermanageComponent', () => {
  let component: AdminmembermanageComponent;
  let fixture: ComponentFixture<AdminmembermanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmembermanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminmembermanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
