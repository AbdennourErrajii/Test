import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitForm } from './produit-form';

describe('ProduitForm', () => {
  let component: ProduitForm;
  let fixture: ComponentFixture<ProduitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
