import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFComponent } from './zone-f.component';

describe('ZoneFComponent', () => {
  let component: ZoneFComponent;
  let fixture: ComponentFixture<ZoneFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
