import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdministradoresComponent } from './editar-administradores.component';

describe('EditarAdministradoresComponent', () => {
  let component: EditarAdministradoresComponent;
  let fixture: ComponentFixture<EditarAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAdministradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
