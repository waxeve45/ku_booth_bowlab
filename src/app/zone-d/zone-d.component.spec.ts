import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDComponent } from './zone-d.component';

describe('ZoneDComponent', () => {
  let component: ZoneDComponent;
  let fixture: ComponentFixture<ZoneDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
