import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  clampProcessScroll,
  getProcessDesktopMetrics,
  getProcessEntryLead,
  getProcessMotionPlan,
  getProcessScrollDistance,
  getProcessSettleDistance,
  getProcessTrackCueState,
  getProcessTimelinePlan,
  getProcessTravel,
} from "../src/components/sections/processDesktop";

describe("getProcessTravel", () => {
  it("uses last card geometry and favors a focused final card over magic overshoot", () => {
    assert.equal(
      getProcessTravel({
        lastCardLeft: 6144,
        lastCardWidth: 1408,
        viewportWidth: 2560,
        gutter: 96,
      }),
      5568,
    );
  });

  it("returns zero when content already fits viewport", () => {
    assert.equal(
      getProcessTravel({
        lastCardLeft: 1200,
        lastCardWidth: 900,
        viewportWidth: 2560,
        gutter: 96,
      }),
      0,
    );
  });
});

describe("clampProcessScroll", () => {
  it("clamps drag scroll below trigger start", () => {
    assert.equal(clampProcessScroll(5600, 5754, 10842), 5754);
  });

  it("clamps drag scroll above trigger end", () => {
    assert.equal(clampProcessScroll(12000, 5754, 10842), 10842);
  });

  it("preserves scroll inside trigger range", () => {
    assert.equal(clampProcessScroll(8123, 5754, 10842), 8123);
  });
});

describe("getProcessSettleDistance", () => {
  it("gives the horizontal section a generous bounded settling range", () => {
    assert.equal(getProcessSettleDistance(900), 522);
    assert.equal(getProcessSettleDistance(500), 360);
    assert.equal(getProcessSettleDistance(1400), 720);
  });
});

describe("getProcessScrollDistance", () => {
  it("adds one transition buffer to horizontal travel without creating dead zones", () => {
    assert.equal(getProcessScrollDistance({ travel: 2400, settleDistance: 522, entryLead: 448 }), 3370);
  });

  it("does not let negative values reduce the pinned distance", () => {
    assert.equal(getProcessScrollDistance({ travel: -20, settleDistance: -5 }), 0);
  });
});

describe("getProcessTimelinePlan", () => {
  it("keeps horizontal travel active across the full sticky scroll distance", () => {
    assert.deepEqual(getProcessTimelinePlan({ travel: 2400, settleDistance: 522, entryLead: 448 }), {
      totalDistance: 3370,
      horizontalStart: 0,
      horizontalDuration: 3370,
      entryLead: 448,
      cueDuration: 522,
      exitCueStart: 2848,
    });
  });
});

describe("getProcessMotionPlan", () => {
  it("derives every desktop scroll value from measured geometry", () => {
    assert.deepEqual(
      getProcessMotionPlan({
        lastCardLeft: 3280,
        lastCardWidth: 672,
        viewportWidth: 1600,
        viewportHeight: 900,
        gutter: 144,
      }),
      {
        travel: 2816,
        settleDistance: 522,
        entryLead: 448,
        totalDistance: 3786,
        scrollHeight: 4686,
        horizontalStart: 0,
        horizontalDuration: 3786,
        cueDuration: 522,
        cueRatio: 0.13787638668779714,
        exitCueStart: 3264,
        exitCueRatio: 0.8621236133122029,
      },
    );
  });

  it("scales with additional stages without changing formulas", () => {
    const metrics = getProcessDesktopMetrics({
      viewportWidth: 1600,
      viewportHeight: 900,
      gutter: 80,
    });
    const stageStride = metrics.cardWidth + metrics.trackGap;
    const fiveStageLastLeft = metrics.trackPaddingLeft + 4 * stageStride;
    const eightStageLastLeft = metrics.trackPaddingLeft + 7 * stageStride;

    const fiveStage = getProcessMotionPlan({
      lastCardLeft: fiveStageLastLeft,
      lastCardWidth: metrics.cardWidth,
      viewportWidth: 1600,
      viewportHeight: 900,
      gutter: metrics.trackPaddingLeft,
    });
    const eightStage = getProcessMotionPlan({
      lastCardLeft: eightStageLastLeft,
      lastCardWidth: metrics.cardWidth,
      viewportWidth: 1600,
      viewportHeight: 900,
      gutter: metrics.trackPaddingLeft,
    });

    assert.equal(eightStage.travel - fiveStage.travel, 3 * stageStride);
    assert.equal(eightStage.totalDistance - fiveStage.totalDistance, 3 * stageStride);
  });
});

describe("getProcessTrackCueState", () => {
  it("keeps entry and exit visual cues bounded across progress", () => {
    assert.deepEqual(getProcessTrackCueState({ progress: 0, cueRatio: 0.2, exitCueRatio: 0.8 }), {
      y: 18,
      opacity: 0.9,
    });
    assert.deepEqual(getProcessTrackCueState({ progress: 0.5, cueRatio: 0.2, exitCueRatio: 0.8 }), {
      y: 0,
      opacity: 1,
    });
    assert.deepEqual(getProcessTrackCueState({ progress: 1, cueRatio: 0.2, exitCueRatio: 0.8 }), {
      y: -14,
      opacity: 0.92,
    });
  });
});

describe("getProcessEntryLead", () => {
  it("starts the pipeline with enough visual lead to keep stage 01 in frame", () => {
    assert.equal(getProcessEntryLead(1600), 448);
    assert.equal(getProcessEntryLead(1200), 360);
    assert.equal(getProcessEntryLead(2560), 520);
  });
});

describe("getProcessDesktopMetrics", () => {
  it("resolves the 1600x900 desktop process geometry to nonzero track spacing", () => {
    const metrics = getProcessDesktopMetrics({
      viewportWidth: 1600,
      viewportHeight: 900,
      gutter: 80,
    });

    assert.equal(metrics.headingTop, 90);
    assert.equal(metrics.trackTop, 288);
    assert.equal(metrics.trackBottom, 90);
    assert.equal(metrics.trackGap, 112);
    assert.equal(metrics.trackPaddingLeft, 144);
    assert.equal(metrics.trackPaddingRight, 272);
    assert.equal(metrics.cardWidth, 672);
    assert.equal(metrics.trackViewportHeight, 522);
  });

  it("keeps final-card travel bounded with the desktop geometry", () => {
    const metrics = getProcessDesktopMetrics({
      viewportWidth: 1600,
      viewportHeight: 900,
      gutter: 80,
    });
    const lastCardLeft =
      metrics.trackPaddingLeft + 4 * (metrics.cardWidth + metrics.trackGap);

    assert.equal(
      getProcessTravel({
        lastCardLeft,
        lastCardWidth: metrics.cardWidth,
        viewportWidth: 1600,
        gutter: metrics.trackPaddingLeft,
      }),
      2816,
    );
  });
});
