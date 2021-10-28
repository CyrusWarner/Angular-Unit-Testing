import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
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
  });
});
