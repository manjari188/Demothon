import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvdiComponent } from './nvdi.component';

describe('NvdiComponent', () => {
  let component: NvdiComponent;
  let fixture: ComponentFixture<NvdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
