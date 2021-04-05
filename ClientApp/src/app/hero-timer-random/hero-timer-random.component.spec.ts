import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTimerRandomComponent } from './hero-timer-random.component';

describe('HeroTimerRandomComponent', () => {
  let component: HeroTimerRandomComponent;
  let fixture: ComponentFixture<HeroTimerRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroTimerRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroTimerRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
