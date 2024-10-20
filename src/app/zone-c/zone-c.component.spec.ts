import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCComponent } from './zone-c.component';

describe('ZoneCComponent', () => {
  let component: ZoneCComponent;
  let fixture: ComponentFixture<ZoneCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
