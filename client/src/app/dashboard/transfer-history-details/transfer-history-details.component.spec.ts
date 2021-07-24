import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoryDetailsComponent } from './transfer-history-details.component';

describe('TransferHistoryDetailsComponent', () => {
  let component: TransferHistoryDetailsComponent;
  let fixture: ComponentFixture<TransferHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferHistoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
