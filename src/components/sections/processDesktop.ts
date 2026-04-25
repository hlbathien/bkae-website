type ProcessTravelInput = {
  lastCardLeft: number;
  lastCardWidth: number;
  viewportWidth: number;
  gutter: number;
};

type ProcessScrollDistanceInput = {
  travel: number;
  settleDistance: number;
  entryLead?: number;
};

type ProcessTimelinePlanInput = {
  travel: number;
  settleDistance: number;
  entryLead?: number;
};

type ProcessDesktopMetricsInput = {
  viewportWidth: number;
  viewportHeight: number;
  gutter: number;
};

type ProcessMotionPlanInput = {
  lastCardLeft: number;
  lastCardWidth: number;
  viewportWidth: number;
  viewportHeight: number;
  gutter: number;
};

type ProcessTrackCueInput = {
  progress: number;
  cueRatio: number;
  exitCueRatio: number;
};

export const PROCESS_SCROLL_SCRUB = 0.85;

export const PROCESS_DESKTOP_LAYOUT = {
  headingTop: "clamp(78px, 10vh, 118px)",
  trackTop: "clamp(250px, 32vh, 315px)",
  trackBottom: "clamp(70px, 10vh, 112px)",
  trackGap: "clamp(60px, 7vw, 116px)",
  trackPaddingLeft: "calc(var(--gutter) + clamp(22px, 4vw, 72px))",
  trackPaddingRight: "calc(var(--gutter) + clamp(80px, 12vw, 220px))",
  cardWidth: "min(42vw, 680px)",
} as const;

function cssClamp(min: number, preferred: number, max: number) {
  return Math.min(Math.max(preferred, min), max);
}

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeInQuad(progress: number) {
  return progress * progress;
}

function easeOutQuad(progress: number) {
  return 1 - (1 - progress) * (1 - progress);
}

export function getProcessDesktopMetrics({
  viewportWidth,
  viewportHeight,
  gutter,
}: ProcessDesktopMetricsInput) {
  const trackGap = Math.round(cssClamp(60, viewportWidth * 0.07, 116));
  const trackPaddingLeft = Math.round(gutter + cssClamp(22, viewportWidth * 0.04, 72));
  const trackPaddingRight = Math.round(gutter + cssClamp(80, viewportWidth * 0.12, 220));
  const trackTop = Math.round(cssClamp(250, viewportHeight * 0.32, 315));
  const trackBottom = Math.round(cssClamp(70, viewportHeight * 0.1, 112));

  return {
    headingTop: Math.round(cssClamp(78, viewportHeight * 0.1, 118)),
    trackTop,
    trackBottom,
    trackGap,
    trackPaddingLeft,
    trackPaddingRight,
    cardWidth: Math.round(Math.min(viewportWidth * 0.42, 680)),
    trackViewportHeight: viewportHeight - trackTop - trackBottom,
  };
}

export function getProcessTravel({
  lastCardLeft,
  lastCardWidth,
  viewportWidth,
  gutter,
}: ProcessTravelInput) {
  if (lastCardLeft + lastCardWidth + gutter <= viewportWidth) return 0;

  const rightAlignedTravel = lastCardLeft + lastCardWidth - viewportWidth + gutter;
  const centeredTravel = lastCardLeft + lastCardWidth / 2 - viewportWidth / 2;

  return Math.max(0, rightAlignedTravel, centeredTravel);
}

export function getProcessSettleDistance(viewportHeight: number) {
  return Math.round(Math.min(Math.max(viewportHeight * 0.58, 360), 720));
}

export function getProcessEntryLead(viewportWidth: number) {
  return Math.round(Math.min(Math.max(viewportWidth * 0.28, 360), 520));
}

export function getProcessScrollDistance({
  travel,
  settleDistance,
  entryLead = 0,
}: ProcessScrollDistanceInput) {
  return Math.max(0, travel) + Math.max(0, settleDistance) + Math.max(0, entryLead);
}

export function getProcessTimelinePlan({
  travel,
  settleDistance,
  entryLead = 0,
}: ProcessTimelinePlanInput) {
  const safeEntryLead = Math.max(0, entryLead);
  const totalDistance = getProcessScrollDistance({
    travel,
    settleDistance,
    entryLead: safeEntryLead,
  });
  const cueDuration = Math.min(Math.max(0, settleDistance), totalDistance);

  return {
    totalDistance,
    horizontalStart: 0,
    horizontalDuration: totalDistance,
    entryLead: safeEntryLead,
    cueDuration,
    exitCueStart: Math.max(0, totalDistance - cueDuration),
  };
}

export function getProcessMotionPlan({
  lastCardLeft,
  lastCardWidth,
  viewportWidth,
  viewportHeight,
  gutter,
}: ProcessMotionPlanInput) {
  const travel = getProcessTravel({
    lastCardLeft,
    lastCardWidth,
    viewportWidth,
    gutter,
  });
  const settleDistance = getProcessSettleDistance(viewportHeight);
  const entryLead = getProcessEntryLead(viewportWidth);
  const timeline = getProcessTimelinePlan({ travel, settleDistance, entryLead });

  return {
    travel,
    settleDistance,
    entryLead,
    totalDistance: timeline.totalDistance,
    scrollHeight: timeline.totalDistance + viewportHeight,
    horizontalStart: timeline.horizontalStart,
    horizontalDuration: timeline.horizontalDuration,
    cueDuration: timeline.cueDuration,
    cueRatio:
      timeline.totalDistance > 0 ? timeline.cueDuration / timeline.totalDistance : 0,
    exitCueStart: timeline.exitCueStart,
    exitCueRatio:
      timeline.totalDistance > 0 ? timeline.exitCueStart / timeline.totalDistance : 1,
  };
}

export function getProcessTrackCueState({
  progress,
  cueRatio,
  exitCueRatio,
}: ProcessTrackCueInput) {
  const safeProgress = clamp01(progress);
  const entryProgress = cueRatio > 0 ? clamp01(safeProgress / cueRatio) : 1;
  const exitSpan = Math.max(0, 1 - exitCueRatio);
  const exitProgress =
    exitSpan > 0 ? clamp01((safeProgress - exitCueRatio) / exitSpan) : safeProgress >= 1 ? 1 : 0;
  const entryEase = easeOutQuad(entryProgress);
  const exitEase = easeInQuad(exitProgress);
  const settledY = lerp(18, 0, entryEase);
  const settledOpacity = lerp(0.9, 1, entryEase);

  return {
    y: Math.round(lerp(settledY, -14, exitEase) * 1000) / 1000,
    opacity: Math.round(lerp(settledOpacity, 0.92, exitEase) * 1000) / 1000,
  };
}

export function clampProcessScroll(nextY: number, startY: number, endY: number) {
  return Math.min(Math.max(nextY, startY), endY);
}
