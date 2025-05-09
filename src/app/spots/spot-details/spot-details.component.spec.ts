import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDetailsComponent } from './spot-details.component';

describe('SpotDetailsComponent', () => {
  let component: SpotDetailsComponent;
  let fixture: ComponentFixture<SpotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
