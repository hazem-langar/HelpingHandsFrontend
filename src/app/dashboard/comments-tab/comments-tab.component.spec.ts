import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsTabComponent } from './comments-tab.component';

describe('CommentsTabComponent', () => {
  let component: CommentsTabComponent;
  let fixture: ComponentFixture<CommentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
