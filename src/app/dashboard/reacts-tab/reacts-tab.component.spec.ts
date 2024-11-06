import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactsTabComponent } from './reacts-tab.component';

describe('ReactsTabComponent', () => {
  let component: ReactsTabComponent;
  let fixture: ComponentFixture<ReactsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
