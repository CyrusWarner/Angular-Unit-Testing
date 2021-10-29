import { MessageService } from "./message.service";
import { HeroService } from "./hero.service";
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
describe("HeroService", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    // Injects the 'mockHttp' into the service
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });
  describe("getHero", () => {
    it("should call get with the correct url", () => {
      heroService.getHero(4).subscribe((hero) => {
        expect(hero.id).toBe(4);
      });

      const request = httpTestingController.expectOne("api/heroes/4");
      // lets us send back data from the request with request.flush
      request.flush({ id: 4, name: "SuperDude", strength: 100 });
      httpTestingController.verify();
    });
  });
});
