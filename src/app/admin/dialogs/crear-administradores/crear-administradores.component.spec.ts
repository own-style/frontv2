import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdministradoresComponent } from './crear-administradores.component';

describe('CrearAdministradoresComponent', () => {
  let component: CrearAdministradoresComponent;
  let fixture: ComponentFixture<CrearAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAdministradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
