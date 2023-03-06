import { DOGS_URL } from "./DogsApi";

describe("Dogs API", () => {
  it("should have the correct API URL", () => {
    expect(DOGS_URL).toEqual("https://dog.ceo/api/breeds/list/all");
  });
});
