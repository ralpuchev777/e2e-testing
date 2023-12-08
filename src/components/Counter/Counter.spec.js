import { test, expect } from "@playwright/experimental-ct-react";
import Counter from "./Counter";

test.use({ viewport: { width: 500, height: 500 } });

test("<Counter /> with playwright", async ({ mount }) => {
  const component = await mount(<Counter />);
  expect(component).toBeDefined();
});

test.describe("Behaviour", () => {
  test("Increment button click", async ({ mount }) => {
    const component = await mount(<Counter />);
    await expect(component.locator("span")).toContainText("0");
    await component.locator("button").filter({ hasText: "+" }).click();
    await expect(component.locator("span")).toContainText("1");
  });

  test("Decrement button click", async ({ mount }) => {
    const component = await mount(<Counter />);
    await expect(component.locator("span")).toContainText("0");
    await component.locator("button").filter({ hasText: "-" }).click();
    await expect(component.locator("span")).toContainText("-1");
  });

  test("Reset button click", async ({ mount }) => {
    const component = await mount(<Counter />);
    await expect(component.locator("span")).toContainText("0");
    await component.locator("button").filter({ hasText: "+" }).click(1);
    await expect(component.locator("span")).toContainText("1");
    await component.locator("button").filter({ hasText: "Reset" }).click();
    await expect(component.locator("span")).toContainText("0");
  });
});
