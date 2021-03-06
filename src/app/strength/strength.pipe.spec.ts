import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
  let pipe:StrengthPipe
  beforeEach(() => {
    pipe = new StrengthPipe();
  })
  it('should display weak if strength is 5', () => {
    // Assert
    expect(pipe.transform(5)).toEqual('5 (weak)');
  })
  it('should display strong if the strength is 10', () => {
    // Assert
    expect(pipe.transform(10)).toEqual('10 (strong)')
  })
  it('should display unbelievable if the strength is 20 or higher', () => {
    //Assert
    expect(pipe.transform(20)).toEqual('20 (unbelievable)')
    expect(pipe.transform(21)).toEqual('21 (unbelievable)')

  })
})
