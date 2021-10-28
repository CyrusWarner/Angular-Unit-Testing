import { HeroComponent } from "../hero/hero.component";
import {
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { forEach } from "@angular-devkit/schematics";
describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 28 },
      { id: 3, name: "SuperDude", strength: 28 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    component = new HeroesComponent(mockHeroService);
  });
  describe("delete", () => {
    it("should remove the indicated hero from the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      let deletedHero = { id: 3, name: "SuperDude", strength: 28 };

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
      expect(component.heroes).not.toContain(deletedHero);
    });
    it("should call deleteHero with the correct hero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});

describe("HeroesComponent (shallow tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let debugEl: DebugElement;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: "app-hero",
    template: "<div></div>",
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 28 },
      { id: 3, name: "SuperDude", strength: 28 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });
  it("should set heroes correctly from the hero service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(component.heroes.length).toBe(3);
  });
  it("should create one li for each hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(debugEl.queryAll(By.css("li")).length).toBe(3);
  });
});

describe("HeroesComponent (Deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let debugEl: DebugElement;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 28 },
      { id: 3, name: "SuperDude", strength: 28 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });
  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentsDebugElements = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    for (let i = 0; i < heroComponentsDebugElements.length; i++) {
      expect(heroComponentsDebugElements[i].componentInstance.hero).toEqual(
        HEROES[i]
      );
    }
    expect(heroComponentsDebugElements.length).toEqual(3);
  });
});
