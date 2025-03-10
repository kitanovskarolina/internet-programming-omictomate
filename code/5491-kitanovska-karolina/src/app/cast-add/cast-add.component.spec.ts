import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCreateComponent } from './cast-add.component';

describe('CastCreateComponent', () => {
  let component: CastCreateComponent;
  let fixture: ComponentFixture<CastCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
