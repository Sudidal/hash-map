import { HashMap } from "./hashMap";

describe("HashMap works perfectly", () => {
  const myHashMap = new HashMap();
  test("HashMap set, get both works", () => {
    myHashMap.set("name", "ahmed");
    myHashMap.set("age", "16");
    expect(myHashMap.get("name")).toBe("ahmed");
  });
  test("HashMap return correct length", () => {
    expect(myHashMap.length()).toBe(2);
  });
  test("HashMap returns keys array", () => {
    expect(myHashMap.keys()).toStrictEqual(["name", "age"]);
  });
  test("HashMap returns values array", () => {
    expect(myHashMap.values()).toStrictEqual(["ahmed", "16"]);
  });
  test("HashMap returns entries array", () => {
    expect(myHashMap.entries()).toStrictEqual([
      ["name", "ahmed"],
      ["age", "16"],
    ]);
  });
  test("HashMap overrides repeated kies", () => {
    myHashMap.set("name", "mohammed");
    expect(myHashMap.get("name")).toBe("mohammed");
  });
});
