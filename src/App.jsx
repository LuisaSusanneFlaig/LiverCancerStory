import React, { useEffect, useMemo } from "react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";
import { narratives, componentMap } from "../constants/narratives";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";

gsap.registerPlugin(ScrollTrigger, SplitText);

const VALID_VERSIONS = ["A", "B", "C"];
const VALID_THEMES = ["blue", "green", "red"];

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

  // =========================================================
  // ✅ PID SOURCE
  // =========================================================

  // --- DEV: use pid from URL if present; otherwise create a local PID
  const pidFromUrl = searchParams.get("pid") || "";
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

  // =========================================================
  // ✅ Assign condition deterministically
  // =========================================================
  const assigned = useMemo(() => assignCondition(pid), [pid]);

  const version = hasValidVersion ? urlVersionRaw : assigned.version;
  const theme = hasValidTheme ? urlThemeRaw : assigned.theme;
  const cond = searchParams.get("cond") || assigned.cond;

  // =========================================================
  // ✅ OPTIONAL: write chosen params into URL
  // =========================================================
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    let changed = false;

    // Always ensure there's a pid in URL during DEV (nice for debugging)
    if (!searchParams.get("pid")) {
      next.set("pid", pid);
      changed = true;
    }

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

    if (changed) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assigned, hasValidTheme, hasValidVersion, pid, searchParams, setSearchParams]);

  // =========================================================
  // ✅ Apply theme to <body> for your CSS variables (Solution A)
  // =========================================================
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-blue", "theme-green", "theme-red");
    body.classList.add(`theme-${theme}`);
    return () => body.classList.remove(`theme-${theme}`);
  }, [theme]);

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