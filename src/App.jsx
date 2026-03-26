import React, { useEffect, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";
import { narratives, componentMap } from "../constants/narratives";
import { sectionGroupsByVersion } from "../constants";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import { initAnalytics, trackStudyVisit } from "./lib/analytics";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SOSCI_SURVEY_URL = "https://befragungen.ovgu.de/LiverCancer/";
const VALID_VERSIONS = ["A", "B", "C"];
const VALID_THEMES = ["blue", "green", "red"];
const IS_DEV = import.meta.env.DEV;

const CONDITIONS = [
  { cond: "1", version: "A", theme: "blue" },
  { cond: "2", version: "A", theme: "green" },
  { cond: "3", version: "A", theme: "red" },
  { cond: "4", version: "B", theme: "blue" },
  { cond: "5", version: "B", theme: "green" },
  { cond: "6", version: "B", theme: "red" },
  { cond: "7", version: "C", theme: "blue" },
  { cond: "8", version: "C", theme: "green" },
  { cond: "9", version: "C", theme: "red" },
];

function hashStringToInt(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function assignCondition(pid) {
  const idx = hashStringToInt(pid || "no_pid") % CONDITIONS.length;
  return CONDITIONS[idx];
}

function getConditionByCond(rawCond) {
  const cond = String(rawCond || "").trim();
  return CONDITIONS.find((entry) => entry.cond === cond) || null;
}

function getOrCreateLocalPid() {
  const key = "local_pid";
  let pid = localStorage.getItem(key);
  if (!pid) {
    pid = `LOCAL_${crypto?.randomUUID?.() || Math.random().toString(16).slice(2)}`;
    localStorage.setItem(key, pid);
  }
  return pid;
}

function buildSurveyReturnUrl(token) {
  if (!token) return SOSCI_SURVEY_URL;

  const url = new URL(SOSCI_SURVEY_URL);
  url.searchParams.set("i", token);
  return url.toString();
}

const componentNameBySectionId = {
  leber: "Leber",
  organe: "Organe",
  sectionacht: "Sectionacht",
  sectionzehn: "Sectionzehn",
  sectionelf: "Sectionelf",
  sectiondreizehn: "Sectiondreizehn",
  sectionvierzehn: "Sectionvierzehn",
};

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = "en";

  const pidFromUrl =
    searchParams.get("PROLIFIC_PID") ||
    searchParams.get("pid") ||
    searchParams.get("num") ||
    searchParams.get("participant_id") ||
    searchParams.get("participant") ||
    "";
  const pid = pidFromUrl || (IS_DEV ? getOrCreateLocalPid() : "no_pid");

  const surveyToken =
    searchParams.get("i") ||
    searchParams.get("tk") ||
    searchParams.get("token") ||
    searchParams.get("t") ||
    "";
  const surveyReturnUrl = useMemo(
    () => buildSurveyReturnUrl(surveyToken),
    [surveyToken]
  );

  const urlVersionRaw = (searchParams.get("version") || "").toUpperCase();
  const urlThemeRaw = (searchParams.get("theme") || "").toLowerCase();
  const urlCondRaw = searchParams.get("cond") || "";

  const hasValidVersion = VALID_VERSIONS.includes(urlVersionRaw);
  const hasValidTheme = VALID_THEMES.includes(urlThemeRaw);
  const conditionFromUrl = useMemo(() => getConditionByCond(urlCondRaw), [urlCondRaw]);
  const hasValidCond = Boolean(conditionFromUrl);

  const assigned = useMemo(() => assignCondition(pid), [pid]);
  const manualOverride =
    IS_DEV && (hasValidCond || hasValidVersion || hasValidTheme);

  const activeCondition =
    conditionFromUrl ||
    (IS_DEV && (hasValidVersion || hasValidTheme)
      ? {
          cond: assigned.cond,
          version: hasValidVersion ? urlVersionRaw : assigned.version,
          theme: hasValidTheme ? urlThemeRaw : assigned.theme,
        }
      : assigned);

  const { version, theme, cond } = activeCondition;

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    let changed = false;

    if (IS_DEV && !searchParams.get("pid")) {
      next.set("pid", pid);
      changed = true;
    }

    if (IS_DEV) {
      if (!hasValidCond) {
        next.set("cond", assigned.cond);
        changed = true;
      }
      if (!hasValidVersion) {
        next.set("version", version);
        changed = true;
      }
      if (!hasValidTheme) {
        next.set("theme", theme);
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
    }

    if (changed) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assigned,
    hasValidCond,
    hasValidTheme,
    hasValidVersion,
    pid,
    searchParams,
    setSearchParams,
    theme,
    version,
  ]);

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

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "study_context",
        JSON.stringify({
          cond,
          version,
          theme,
          pid,
          surveyToken,
        })
      );
    }

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
  }, [cond, lang, manualOverride, pid, surveyToken, theme, version]);

  const selectedNarrative = narratives[version] || narratives.A;
  const sectionGroups = sectionGroupsByVersion[version] || sectionGroupsByVersion.A;
  const chapterIntroNames = useMemo(() => {
    return new Set(
      Object.values(sectionGroups)
        .map((sections) => sections[0])
        .map((sectionId) => componentNameBySectionId[sectionId])
        .filter(Boolean)
    );
  }, [sectionGroups]);

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
            pid={pid}
            cond={cond}
            surveyToken={surveyToken}
            surveyReturnUrl={surveyReturnUrl}
            chapterIntro={chapterIntroNames.has(section.name)}
            {...section.props}
          />
        );
      })}
    </main>
  );
};

export default App;
