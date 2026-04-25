import { expect, test, type Page } from "@playwright/test";

const PROCESS = 'section[data-section="process"]';
const RELEVANT_CONSOLE_REGRESSION =
  /Hydration failed|Encountered a script tag|webpack-hmr|ERR_INVALID_HTTP_RESPONSE/i;

type PageWithRelevantMessages = Page & {
  relevantConsoleRegressions?: string[];
};

async function waitForMarketingHydration(page: Page) {
  await page.waitForFunction(() => Boolean(window.__lenis));
  const viewport = page.viewportSize();
  if (viewport && viewport.width >= 1025) {
    await page.waitForFunction(() => {
      const process = document.querySelector('section[data-section="process"]');
      return Boolean(process && getComputedStyle(process).getPropertyValue("--process-scroll-height"));
    });
  }
}

async function gotoHome(page: Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("ae:visit-count", "1");
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await waitForMarketingHydration(page);
  await page.waitForTimeout(800);
}

async function jumpToProcess(page: Page) {
  await page.evaluate((selector) => {
    const process = document.querySelector<HTMLElement>(selector);
    if (!process) throw new Error("Process section missing");
    window.__lenis?.scrollTo(process, { immediate: true });
  }, PROCESS);
  await page.waitForTimeout(900);
}

async function jumpToProcessEntry(page: Page) {
  await page.evaluate((selector) => {
    const process = document.querySelector<HTMLElement>(selector);
    if (!process) throw new Error("Process section missing");
    const y = process.getBoundingClientRect().top + window.scrollY;
    window.__lenis?.scrollTo(y, { immediate: true, force: true });
    window.scrollTo(0, y);
    (window as typeof window & { ScrollTrigger?: { update?: () => void } }).ScrollTrigger?.update?.();
  }, PROCESS);
  await page.waitForTimeout(900);
}

async function getDesktopGeometry(page: Page) {
  return page.evaluate((selector) => {
    const process = document.querySelector<HTMLElement>(selector);
    if (!process) throw new Error("Process section missing");

    const headingFrame = process.querySelector<HTMLElement>("[data-process-heading-frame]");
    const trackWindow = process.querySelector<HTMLElement>("[data-process-track-window]");
    const track = process.querySelector<HTMLElement>("[data-process-track]");
    const rail = process.querySelector<HTMLElement>("[data-process-rail]");
    const cards = Array.from(process.querySelectorAll<HTMLElement>("[data-process-card]"));
    const edges = Array.from(process.querySelectorAll<HTMLElement>("[data-process-edge]"));

    if (!headingFrame || !trackWindow || !track || !rail || cards.length < 2) {
      throw new Error("Process desktop hooks missing");
    }

    const rect = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        width: r.width,
        height: r.height,
      };
    };

    const computedTrack = getComputedStyle(track);
    return {
      headingFrame: rect(headingFrame),
      trackWindow: rect(trackWindow),
      firstCard: rect(cards[0]),
      secondCard: rect(cards[1]),
      lastCard: rect(cards[cards.length - 1]),
      rail: rect(rail),
      edgeCount: edges.length,
      cardBorderTopWidths: cards.map((card) => getComputedStyle(card).borderTopWidth),
      transformX: new DOMMatrixReadOnly(computedTrack.transform).m41,
      trackGap: Number.parseFloat(computedTrack.columnGap || computedTrack.gap),
      trackPaddingLeft: Number.parseFloat(computedTrack.paddingLeft),
      trackPaddingRight: Number.parseFloat(computedTrack.paddingRight),
      canScrollX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  }, PROCESS);
}

test.describe("Process section", () => {
  test.beforeEach(async ({ page }) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });

    const messages: string[] = [];
    (page as PageWithRelevantMessages).relevantConsoleRegressions = messages;

    page.on("console", (msg) => {
      const text = msg.text();
      if (RELEVANT_CONSOLE_REGRESSION.test(text)) messages.push(text);
    });
    page.on("pageerror", (error) => {
      const text = error.message;
      if (RELEVANT_CONSOLE_REGRESSION.test(text)) messages.push(text);
    });
  });

  test.afterEach(async ({ page }) => {
    expect((page as PageWithRelevantMessages).relevantConsoleRegressions ?? []).toEqual([]);
  });

  test("desktop layout keeps heading, track, card gaps, and connector geometry stable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await gotoHome(page);
    await jumpToProcess(page);

    const geometry = await getDesktopGeometry(page);

    expect(geometry.headingFrame.top).toBeGreaterThanOrEqual(70);
    expect(geometry.headingFrame.bottom).toBeLessThan(230);
    expect(geometry.trackWindow.top).toBeGreaterThan(250);
    expect(geometry.trackWindow.bottom).toBeLessThanOrEqual(830);
    expect(geometry.trackGap).toBeGreaterThan(50);
    expect(geometry.trackPaddingLeft).toBeGreaterThan(80);
    expect(geometry.trackPaddingRight).toBeGreaterThan(120);
    expect(geometry.secondCard.left - geometry.firstCard.right).toBeGreaterThan(50);
    expect(geometry.edgeCount).toBe(0);
    expect(geometry.rail.left).toBeLessThanOrEqual(geometry.firstCard.left + 1);
    expect(geometry.rail.right).toBeGreaterThanOrEqual(geometry.lastCard.right - 1);
    expect(geometry.cardBorderTopWidths.every((width) => width === "0px")).toBe(true);
    expect(geometry.canScrollX).toBe(false);
  });

  test("desktop entry keeps the first pipeline stage inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await gotoHome(page);
    await jumpToProcessEntry(page);

    const geometry = await getDesktopGeometry(page);

    expect(geometry.firstCard.left).toBeGreaterThanOrEqual(96);
    expect(geometry.firstCard.right).toBeLessThanOrEqual(1600);
  });

  test("desktop scroll interaction translates the horizontal process track", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await gotoHome(page);
    await jumpToProcess(page);

    const before = await getDesktopGeometry(page);
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(1000);
    const after = await getDesktopGeometry(page);

    expect(after.transformX).toBeLessThan(before.transformX - 100);
    expect(after.lastCard.left).toBeLessThan(1600);
    expect(after.lastCard.right).toBeGreaterThan(0);
  });

  test("mobile layout uses the vertical process list without horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page);
    await jumpToProcess(page);

    const geometry = await page.evaluate((selector) => {
      const process = document.querySelector<HTMLElement>(selector);
      if (!process) throw new Error("Process section missing");
      const mobileList = process.querySelector<HTMLOListElement>("[data-process-mobile-list]");
      const desktop = process.querySelector<HTMLElement>("[data-process-desktop]");
      if (!mobileList || !desktop) throw new Error("Process mobile hooks missing");

      return {
        mobileDisplay: getComputedStyle(mobileList).display,
        desktopDisplay: getComputedStyle(desktop).display,
        itemCount: mobileList.children.length,
        canScrollX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    }, PROCESS);

    expect(geometry.mobileDisplay).not.toBe("none");
    expect(geometry.desktopDisplay).toBe("none");
    expect(geometry.itemCount).toBe(5);
    expect(geometry.canScrollX).toBe(false);
  });

  test("home hydration has no process-related console regressions", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await gotoHome(page);
  });
});
