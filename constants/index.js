

export const navTitles = {
  definition: "Definition",
  anatomie: "Anatomie",
  symptome: "Symptome",
  diagnose: "Diagnose",
  behandlung: "Behandlung",
  prognose: "Prognose",
  prävention: "Prävention",
};

export const sectionGroupsByVersion = {
  A: {
    definition: ["leber", "deutschland"],
    anatomie: ["organe", "sectionsechs", "sectionsieben"],
    symptome: ["sectionacht", "sectionneun"],
    diagnose: ["sectionzehn"],
    behandlung: ["sectionelf", "sectionzwoelf"],
    prognose: ["sectiondreizehn"],
    prävention: ["sectionvierzehn"],
  },

  B: {
    prävention: ["sectionvierzehn"],
    anatomie: ["organe", "sectionsechs", "sectionsieben"],
    symptome: ["sectionacht", "sectionneun"],
    definition: ["leber", "deutschland"],
    diagnose: ["sectionzehn"],
    behandlung: ["sectionelf", "sectionzwoelf"],
    prognose: ["sectiondreizehn"],
  },

  C: {
    symptome: ["sectionacht", "sectionneun"],
    prognose: ["sectiondreizehn"],
    definition: ["leber", "deutschland"],
    anatomie: ["organe", "sectionsechs", "sectionsieben"],
    prävention: ["sectionvierzehn"],
    diagnose: ["sectionzehn"],
    behandlung: ["sectionelf", "sectionzwoelf"],
  },
};

// Option 1: build navLinksByVersion from the order of keys in sectionGroupsByVersion
export const navLinksByVersion = Object.fromEntries(
  Object.entries(sectionGroupsByVersion).map(([ver, groups]) => {
    const links = Object.keys(groups).map((id) => ({
      id,
      title: navTitles[id] ?? id,
    }));
    return [ver, links];
  })
);

// Backward compatibility (optional)
export const navLinks = navLinksByVersion.A;