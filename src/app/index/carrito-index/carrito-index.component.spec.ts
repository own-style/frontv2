import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoIndexComponent } from './carrito-index.component';

describe('CarritoIndexComponent', () => {
  let component: CarritoIndexComponent;
  let fixture: ComponentFixture<CarritoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
