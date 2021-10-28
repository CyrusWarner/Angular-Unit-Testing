import { HeroComponent } from "./hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
// Shallow integration tests
describe("HeroComponent", () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;
  let nativeEl: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    // TestBed.createComponent returns a component fixture
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
  });
  it("should render the hero name in an anchor tag", () => {
    component.hero = { id: 1, name: "SuperDude", strength: 20 };
    fixture.detectChanges();

    expect(nativeEl.querySelector('a').textContent).toContain('SuperDude');
  });
});
