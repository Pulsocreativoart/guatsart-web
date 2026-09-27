import { expect, test } from "@playwright/test";

test("renders the curatorial home page and its main sections", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/GÜATSART/);
  await expect(page.getByRole("heading", { level: 1, name: /GÜATS ART/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /La superficie también habla/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Esto no es una galería/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Hagamos espacio para una idea/i })).toBeVisible();
});

test("opens and closes an artwork lightbox", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const artworkButton = page.getByRole("button", { name: /Ampliar La Búsqueda y El Sistema/i });
  await artworkButton.scrollIntoViewIfNeeded();
  await artworkButton.click();
  const dialog = page.getByRole("dialog", { name: /Vista ampliada/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "La Búsqueda y El Sistema" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Vista ampliada/i })).toBeHidden();
});

test("has no accidental horizontal body overflow", async ({ page }) => {
  await page.goto("/");
  const widths = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
});

test("supports reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const animation = await page.locator(".marquee > div").evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
});
