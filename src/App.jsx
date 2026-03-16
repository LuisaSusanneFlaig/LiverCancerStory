import React, { useEffect, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";
import { narratives, componentMap } from "../constants/narratives";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import { useLanguage } from "./components/Context/LanguageContext";
import { initAnalytics, trackStudyVisit } from "./lib/analytics";

gsap.registerPlugin(ScrollTrigger, SplitText);

const VALID_VERSIONS = ["A", "B", "C"];
const VALID_THEMES = ["blue", "green", "red"];
const IS_DEV = import.meta.env.DEV;

// 9 Bedingungen (für späteres Logging)
const CONDITIONS = [
  { version: "A", theme: "blue" },
  { version: "A", theme: "green" },
  { version: "A", theme: "red" },
  { version: "B", theme: "blue" },
  { version: "B", theme: "green" },
  { version: "B", theme: "red" },
  { version: "C", theme: "blue" },
  { version: "C", theme: "green" },
  { version: "C", theme: "red" },
];

// stabiler Hash
function hashStringToInt(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function assignCondition(pid) {
  const idx = hashStringToInt(pid || "no_pid") % CONDITIONS.length;
  return { ...CONDITIONS[idx], cond: String(idx) };
}

/**
 * DEV helper:
 * if there is no ?pid=... in the URL, create a stable local PID once and reuse it.
 * This mimics Prolific behavior so your assignment stays stable across refresh.
 */
function getOrCreateLocalPid() {
  const key = "local_pid";
  let pid = localStorage.getItem(key);
  if (!pid) {
    pid = `LOCAL_${crypto?.randomUUID?.() || Math.random().toString(16).slice(2)}`;
    localStorage.setItem(key, pid);
  }
  return pid;
}

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useLanguage();

  // =========================================================
  // ✅ PID SOURCE
  // =========================================================

  // --- DEV: use pid from URL if present; otherwise create a local PID
  const pidFromUrl =
    searchParams.get("PROLIFIC_PID") ||
    searchParams.get("pid") ||
    "";
  const pid = pidFromUrl || getOrCreateLocalPid();

  // --- PROLIFIC (later): you will typically receive pid in URL already
  // const pid = searchParams.get("PROLIFIC_PID") || searchParams.get("pid") || "";

  // =========================================================
  // ✅ Read manual overrides (optional)
  // =========================================================
  const urlVersionRaw = (searchParams.get("version") || "").toUpperCase();
  const urlThemeRaw = (searchParams.get("theme") || "").toLowerCase();

  const hasValidVersion = VALID_VERSIONS.includes(urlVersionRaw);
  const hasValidTheme = VALID_THEMES.includes(urlThemeRaw);
  const hasCondOverride = searchParams.has("cond");

  // =========================================================
  // ✅ Assign condition deterministically
  // =========================================================
  const assigned = useMemo(() => assignCondition(pid), [pid]);

  const manualOverride = IS_DEV && (hasValidVersion || hasValidTheme || hasCondOverride);
  const version = IS_DEV && hasValidVersion ? urlVersionRaw : assigned.version;
  const theme = IS_DEV && hasValidTheme ? urlThemeRaw : assigned.theme;
  const cond = IS_DEV && hasCondOverride ? searchParams.get("cond") || assigned.cond : assigned.cond;

  // =========================================================
  // ✅ OPTIONAL: write chosen params into URL
  // =========================================================
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    let changed = false;

    // Always ensure there's a pid in URL during DEV (nice for debugging)
    if (IS_DEV && !searchParams.get("pid")) {
      next.set("pid", pid);
      changed = true;
    }

    if (IS_DEV) {
      if (!hasValidVersion) {
        next.set("version", assigned.version);
        changed = true;
      }
      if (!hasValidTheme) {
        next.set("theme", assigned.theme);
        changed = true;
      }
      if (!searchParams.get("cond")) {
        next.set("cond", assigned.cond);
        changed = true;
      }
    } else {
      if (next.has("version")) {
        next.delete("version");
        changed = true;
      }
      if (next.has("theme")) {
        next.delete("theme");
        changed = true;
      }
      if (next.has("cond")) {
        next.delete("cond");
        changed = true;
      }
    }

    if (changed) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assigned, hasValidTheme, hasValidVersion, pid, searchParams, setSearchParams]);

  // =========================================================
  // ✅ Apply theme to <body> for your CSS variables (Solution A)
  // =========================================================
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove("theme-blue", "theme-green", "theme-red");
    body.classList.remove("theme-blue", "theme-green", "theme-red");
    root.classList.add(`theme-${theme}`);
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    let active = true;

    initAnalytics().then((enabled) => {
      if (!active || !enabled) return;

      trackStudyVisit({
        cond,
        version,
        theme,
        language: lang,
        manualOverride,
      });
    });

    return () => {
      active = false;
    };
  }, [cond, lang, manualOverride, theme, version]);

  const selectedNarrative = narratives[version] || narratives.A;

  return (
    <main>
      <Navbar version={version} theme={theme} />

      {selectedNarrative.map((section, index) => {
        const Component = componentMap[section.name];
        if (!Component) return null;

        return (
          <Component
            key={`${section.name}-${index}`}
            theme={theme}
            version={version}
            pid={pid}     // useful for logging later
            cond={cond}   // useful for logging later
            {...section.props}
          />
        );
      })}
    </main>
  );
};

export default App;
