import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductionDialogComponent } from './delete-production-dialog.component';

describe('DeleteProductionDialogComponent', () => {
  let component: DeleteProductionDialogComponent;
  let fixture: ComponentFixture<DeleteProductionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProductionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProductionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
