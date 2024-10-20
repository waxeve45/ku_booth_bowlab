import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneEComponent } from './zone-e.component';

describe('ZoneEComponent', () => {
  let component: ZoneEComponent;
  let fixture: ComponentFixture<ZoneEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
