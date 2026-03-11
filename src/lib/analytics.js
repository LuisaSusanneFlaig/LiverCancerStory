const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let gaInitialized = false;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export function getDeviceCategory() {
  if (typeof window === "undefined") return "unknown";

  const width = window.innerWidth;
  const touchPoints = navigator.maxTouchPoints || 0;
  const isTouch = touchPoints > 0;
  const ua = navigator.userAgent || "";
  const isTabletUa = /iPad|Tablet|PlayBook|Silk|Kindle|Android(?!.*Mobile)/i.test(ua);
  const isMobileUa = /Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua);

  if (isTabletUa || (isTouch && width >= 768 && width <= 1280)) {
    return "tablet";
  }

  if (isMobileUa || width < 768) {
    return "mobile";
  }

  return "desktop";
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || gaInitialized || typeof window === "undefined") {
    return Promise.resolve(Boolean(GA_MEASUREMENT_ID));
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
  });

  gaInitialized = true;

  return loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`)
    .then(() => true)
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export function trackEvent(eventName, params = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackStudyVisit({ cond, version, theme, language }) {
  const sessionKey = `study_visit:${cond}:${version}:${theme}:${language}`;

  if (sessionStorage.getItem(sessionKey)) {
    return;
  }

  trackEvent("study_visit", {
    condition: `${version}_${theme}`,
    condition_index: cond,
    narrative_version: version,
    color_dimension: theme,
    language,
    device_category: getDeviceCategory(),
  });

  sessionStorage.setItem(sessionKey, "1");
}

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}
