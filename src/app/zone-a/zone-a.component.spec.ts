import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAComponent } from './zone-a.component';

describe('ZoneAComponent', () => {
  let component: ZoneAComponent;
  let fixture: ComponentFixture<ZoneAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
