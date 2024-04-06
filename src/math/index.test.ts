import { describe, expect, test } from "@jest/globals";
import { clamp, roll } from "./index";

describe("math module", () => {
  test("clamps number lower than the min, to the min", () => {
    expect(clamp(1, 10, -1)).toBe(1);
  });

  test("clamps number greater than the max, to the max", () => {
    expect(clamp(1, 10, 11)).toBe(10);
  });
});
