import React, { useEffect, useMemo } from "react";
import { navLinksByVersion, sectionGroupsByVersion, navTitlesEn } from "../../constants";
import { useLanguage } from "./Context/LanguageContext";

const Navbar = ({ version = "A" }) => {
  const { lang, toggleLang } = useLanguage();

  const sectionGroups =
    sectionGroupsByVersion[version] || sectionGroupsByVersion.A;

  const navLinks =
    navLinksByVersion[version] || navLinksByVersion.A;

  // translate title
  const titleFor = (id, fallback) => {
    if (lang === "en") return navTitlesEn?.[id] ?? fallback;
    return fallback; // DE is your existing titles
  };

  const allSectionIds = useMemo(() => {
    return ["hero", ...Object.values(sectionGroups).flat(), "sectionfuenfzehn"];
  }, [sectionGroups]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const activate = (id) => {
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.toggle("active", link.dataset.link === id);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;

        let found = false;
        for (const [navId, sections] of Object.entries(sectionGroups)) {
          if (sections.includes(sectionId)) {
            activate(navId);
            found = true;
            break;
          }
        }

        if (!found) activate(null);
      });
    }, observerOptions);

    allSectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [allSectionIds, sectionGroups]);

  return (
    <nav>
      <div className="flex items-center justify-between w-full">
        <ul className="flex gap-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} data-link={link.id} className="px-2 py-1">
                {titleFor(link.id, link.title)}
              </a>
            </li>
          ))}
        </ul>

        {/* ✅ Language toggle (NOT URL-based) */}
        <button
          type="button"
          onClick={toggleLang}
          className="px-3 py-1 rounded"
          aria-label="Toggle language"
        >
          {lang === "de" ? "ENG" : "DE"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;