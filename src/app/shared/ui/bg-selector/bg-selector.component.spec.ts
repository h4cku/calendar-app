import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgSelectorComponent } from './bg-selector.component';

describe('BgSelectorComponent', () => {
  let component: BgSelectorComponent;
  let fixture: ComponentFixture<BgSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BgSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
