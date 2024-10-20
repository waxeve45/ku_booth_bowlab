import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneBComponent } from './zone-b.component';

describe('ZoneBComponent', () => {
  let component: ZoneBComponent;
  let fixture: ComponentFixture<ZoneBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
