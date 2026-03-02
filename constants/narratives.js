import { sectionGroupsByVersion } from "./index"; 

import Hero from "../src/components/Hero";
import Thomas from "../src/components/Thomas";
import Leber from "../src/components/Leber";
import Deutschland from "../src/components/Deutschland";
import Organe from "../src/components/Organe";
import Sectionsechs from "../src/components/Sectionsechs";
import Sectionsieben from "../src/components/Sectionsieben";
import Sectionacht from "../src/components/Sectionacht";
import Sectionneun from "../src/components/Sectionneun";
import Sectionzehn from "../src/components/Sectionzehn";
import Sectionelf from "../src/components/Sectionelf";
import Sectionzwoelf from "../src/components/Sectionzwoelf";
import Sectiondreizehn from "../src/components/Sectiondreizehn";
import Sectionvierzehn from "../src/components/Sectionvierzehn";
import Sectionfuenfzehn from "../src/components/Sectionfuenfzehn";


import ThomasIll from "../src/images/Thomas_ill.png";
import LT1 from "../src/images/LT1.png";
import LT2 from "../src/images/LT2.png";
import LT3 from "../src/images/LT3.png";
import LT4 from "../src/images/LT4.png";
import BiopsieImg from "/src/images/Biopsie.jpg";
import Curative2 from "/src/images/Curative2.jpg";
import Curative3 from "/src/images/Curative3.jpg";
import Curative4 from "/src/images/Curative4.jpg";
import ThomasAndDoctor from "/src/images/Thomas_and_doctor.png";

const ORDER_FIXED = ["hero","thomas","sectionfuenfzehn"]; 

function reorderNarrativeByGroups(narrativeArray, groups) {
  const byId = new Map(narrativeArray.map((s) => [s.name, s]));

  const idToName = {
    hero: "Hero",
    thomas: "Thomas",
    leber: "Leber",
    deutschland: "Deutschland",
    organe: "Organe",
    sectionsechs: "Sectionsechs",
    sectionsieben: "Sectionsieben",
    sectionacht: "Sectionacht",
    sectionneun: "Sectionneun",
    sectionzehn: "Sectionzehn",
    sectionelf: "Sectionelf",
    sectionzwoelf: "Sectionzwoelf",
    sectiondreizehn: "Sectiondreizehn",
    sectionvierzehn: "Sectionvierzehn",
    sectionfuenfzehn: "Sectionfuenfzehn",
  };

  const orderedNames = [
    idToName.hero,
    idToName.thomas, // ✅ FIX: always second
    ...Object.values(groups).flat().map((id) => idToName[id]),
    idToName.sectionfuenfzehn,
  ].filter(Boolean);

  const seen = new Set();
  const uniqueOrderedNames = orderedNames.filter((n) =>
    seen.has(n) ? false : (seen.add(n), true)
  );

  return uniqueOrderedNames
    .map((name) => byId.get(name))
    .filter(Boolean);
}
const components = {
  Hero,
  Thomas,
  Leber,
  Deutschland,
  Organe,
  Sectionsechs,
  Sectionsieben,
  Sectionacht,
  Sectionneun,
  Sectionzehn,
  Sectionelf,
  Sectionzwoelf,
  Sectiondreizehn,
  Sectionvierzehn,
  Sectionfuenfzehn,
};

export const narratives = {
  A: [
  {
    name: "Hero",
    props: {
      title: "Leberkrebs",
      subtitle: "Eine interaktive Geschichte",
      author: "von LUISA FLAIG",
      scrollText: "zum Beginnen Scrollen",
      scrollTarget: "#definition"
    }
  },
    {
    name: "Thomas",
    props: {
      heading: "Was bedeutet eine Leberkrebsdiagnose?",
      body:
        "Thomas ist 52 Jahre alt. Bei einer Routineuntersuchung stellt sein Hausarzt erhöhte Leberwerte fest. Weitere Untersuchungen bringen Gewissheit: In seiner Leber haben sich mehrere Tumore gebildet, im übrigen Körper sind jedoch keine Metastasen nachweisbar.",
      imageSrc: ThomasIll,
      imageAlt: "Thomas",
    },
  },

  {
  name: "Leber",
  props: {
    heading: "Was ist Leberkrebs?",
  }
},

{
  name: "Deutschland",
  props: {
    p1Left: "In Deutschland werden jährlich etwa 8.790 neue Fälle von Leberkrebs diagnostiziert.",
    p1Right:
      "In den letzten 35 Jahren hat sich die Zahl der Neuerkrankungen verdoppelt – ein klarer Handlungsbedarf für Prävention und Früherkennung.",
    p2Left:
      "Auffällig ist dabei das Geschlechterverhältnis: Männer sind dreimal häufiger betroffen als Frauen.",
    p2ImageSrc: "ratio",
    p2ImageAlt: "Statistik",
    p3Text:
      "Das durchschnittliche Alter bei der Erstdiagnose von Leberkrebs unterscheidet sich leicht zwischen den Geschlechtern. Bei Männern liegt das Durchschnittsalter der Diagnose bei 69,9 Jahren, während es bei Frauen mit 72,1 Jahren geringfügig höher ist.",
  }
},

{
  name: "Organe",
  props: {
    heading: "Die Leber: ein besonderes Organ",
  }
},

{
  name: "Sectionsechs",
  props: {
    leftText:
      "Die Leber ist das größte und wichtigste Organ zur Verdauung von Nahrung und zur Beseitigung von Giftstoffen.",
    rightText:
      "Sie befindet sich im rechten Oberbauch, unterhalb des Herzens. Sie wird durch ein ausgedehntes Netz von Blutgefäßen versorgt und entwässert."
  }
},

{
  name: "Sectionsieben",
  props: {}
},
{
  name: "Sectionacht",
  props: {
    heading: "Wie macht sich Leberkrebs bemerkbar?",
    introText:
      "Da die Leber nicht schmerzempfindlich ist, verursacht Leberkrebs in der Regel zunächst keine Symptome. Im fortgeschrittenen Stadium äußert sich Leberkrebs auf verschiedene Weise.",
items: [
  { assetKey: "scale", text: "Abnehmen ohne Anstrengung" },
  { assetKey: "junkfood", text: "Appetitlosigkeit" },
  { assetKey: "temperature", text: "Erhöhte Temperatur" },
  { assetKey: "stroke", text: "Schmerzen im Oberbauch" },
  { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
  { assetKey: "nausea", text: "Schwellungen des Bauches" },
  { assetKey: "liver", text: "Gelbe Hautverfärbung" },
]
  }
},

{
  name: "Sectionneun",
  props: {
    heading: "Wie wird Leberkrebs diagnostiziert?",
    introRight: "Die Diagnostik soll klären, wie weit die Erkrankung fortgeschritten ist.",

    q1Text: "1. Sind Tumore in der Leber vorhanden? Wenn ja, wie viele?",
    q1ImageSrc: LT1,
    q1ImageAlt: "Tumore in der Leber",

    methodsIntro: "Zum Auffinden von Lebertumoren können verschiedene bildgebende Verfahren eingesetzt werden, darunter:",
    method1ImageKey: "Ultrasound",
    method1Label: "Ultraschall",

    method2ImageKey: "CT",
    method2Label: "CT",

    method3ImageKey: "MRI",
    method3Label: "MRT",

    q2Text: "2. Wo genau befinden sich die Tumore?",
    q2ImageSrc: LT2,
    q2ImageAlt: "Lage der Tumore",

    q3Text: "3. Wie groß sind die Tumore?",
    q3ImageSrc: LT3,
    q3ImageAlt: "Größe der Tumore",

    q4Text: "4. Was ist der genaue Typ?",
    q4ImageSrc: LT4,
    q4ImageAlt: "Tumortyp",
  }
},
{
  name: "Sectionzehn",
  props: {
    heading: "Wie wird Leberkrebs behandelt?",


    l1Text:
      "Die Behandlungsplanung hängt davon ab, wie weit die Krankheit  fortgeschritten ist und in welchem Zustand sich die Leber befindet.",
    l1ImageKey: "behandlung",
    l1ImageAlt: "Behandlung",

    l2LeftText:
      "Außerdem spielen das Alter und der allgemeine Gesundheitszustand der Patienten eine wichtige Rolle. Abhängig davon gibt es heilende und palliative Behandlungen.",
    l2RightText:
      "Der Grad der Veränderung lässt sich nur durch eine mikroskopische Untersuchung der Krebszellen feststellen. Bei einer Biopsie wird eine kleine Probe des Lebergewebes entnommen und unter dem Mikroskop untersucht.",

    l3LeftText:
      "Für die Therapieplanung ist es wichtig, das Ausmaß der Veränderung der Zellen zu verstehen. Der Schweregrad eines Tumors hängt davon ab, wie stark sich die Zellen bereits bösartig verändert haben.",
    l3ImageSrc: BiopsieImg,
    l3ImageAlt: "Biopsie",

    l3Order: "textFirst"   // 👈 important
  }
},

{
  name: "Sectionelf",
  props: {
    heading: "Heilende Behandlung für Leberkrebs",


    l1RightText:
      "Bei chirurgischen Eingriffen werden Teile der Leber, die Tumore enthalten, entfernt.",
    l1ImageSrc: Curative2,
    l1ImageAlt: "Operation / Resektion",

    l2LeftText:
      "Tumore können auch mit einer Ablation behandelt werden. Dabei wird eine Nadel in den Tumor eingeführt, durch die Hitze oder Mikrowellen geleitet werden, um den Tumor zu zerstören.",
    l2ImageSrc: Curative3,
    l2ImageAlt: "Ablation",

    l3LeftText:
      "Darüber hinaus können winzige, mit radioaktivem Material gefüllte Kügelchen in die Lebergefäße eingebracht werden. Der Tumor wird lokal von innen bestrahlt, was zum Absterben der Tumorzellen führt.",
    l3ImageSrc: Curative4,
    l3ImageAlt: "Interne Strahlentherapie",
  }
},

{
  name: "Sectionzwoelf",
  props: {
    heading: "Palliative Behandlung für Leberkrebs",
 

    p1Text:
      "Wenn keine Aussicht auf Heilung besteht, kann eine palliative Therapie das Wachstum des Tumors verlangsamen und die Symptome lindern.",

    p1Items: [
      { assetKey: "weight", text: "Abnehmen ohne Anstrengung" },
      { assetKey: "junkfood", text: "Appetitlosigkeit" },
      { assetKey: "temperature", text: "Erhöhte Temperatur" },
    ],

    p2Text:
      "Spezielle Chemotherapien verlangsamen das Tumorwachstum. Schmerzmittel und kalorienreiches Essen reduzieren die Symptome.",

    p2Items: [
      { assetKey: "pain", text: "Schmerzen im Oberbauch" },
      { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
      { assetKey: "weightgain", text: "Schwellungen des Bauches" },
    ],
  }
},

{
  name: "Sectiondreizehn",
  props: {
    heading: "Prognose von Leberkrebs",


    l1Text1: "Das hängt vom Stadium des Krebses und dem Zustand der Leber ab.",
    l1Text2: "5 Jahres Überlebensrate:",
    l1Rate: "18%",
    l1RateImageKey: "manandwoman",
    l1RateImageAlt: "man and woman",

    step1Label: "Tumor entfernt:",

    step2Text:
      "Stadium I Tumore (einzelne Tumore, ohne Befall der Blutgefäße oder Lymphknoten und ohne Fernmetastasen)",
    step2FemaleRate: "54%",
    step2FemaleIconKey: "woman",
    step2FemaleIconAlt: "woman",
    step2MaleRate: "62%",
    step2MaleIconKey: "man",
    step2MaleIconAlt: "man",

    step3Text: "Stadium IV Tumore (Lymphknotenbefall oder Fernmetastasen)",
    step3Rate: "2%",
    step3IconKey: "manandwoman",
    step3IconAlt: "statistic",
  }
},
{
  name: "Sectionvierzehn",
  props: {
    heading: "Wie kann ich Leberkrebs vorbeugen?",

    introText: "Einige Risikofaktoren für Leberkrebs sind vermeidbar:",
    bullets: ["Hepatitis B", "Alkoholkonsum", "Übergewicht", "Rauchen"],
items: [
  { assetKey: "vaccine", text: "Impfung gegen Hepatitis" },
  { assetKey: "alcohol", text: "Alkoholkonsum einschränken" },
  { assetKey: "weightgain", text: "Gewicht in einem gesunden Bereich halten" },
  { assetKey: "smoking", text: "Aufhören zu rauchen" },
],
  }
},
{
  name: "Sectionfuenfzehn",
  props: {
    heading: "Das Ergebnis von Thomas's Geschichte",


    l1Text:
      "Thomas steht am Anfang seiner Reise mit der Diagnose Leberkrebs. Sein Leben wird sich grundlegend verändern, denn gemeinsam mit seinem Arzt muss er nun eine passende Behandlungsmethode wählen und sich zugleich mit der Frage auseinandersetzen, wie sein zukünftiger Lebensstil aussehen soll.",

    l2LeftText:
      "Ein Leben mit Krebs bringt viele Herausforderungen mit sich. Umso wichtiger ist es, dass Thomas die Unterstützung in Anspruch nimmt, die er auf diesem Weg braucht.",

    l2ImageSrc: ThomasAndDoctor,
    l2ImageAlt: "Thomas und Arzt",
  }
}

  ],

  B: [
    { name: "Hero", props: {       
    title: "Leberkrebs und mögliche Chancen",
      subtitle: "Eine interaktive Geschichte",
      author: "von LUISA FLAIG",
      scrollText: "zum Beginnen Scrollen",

      scrollTarget: "#definition"
    } 
},
{
  name: "Thomas",
  props: {
    heading: "Wie findet man zurück ins Lebens?",
    body: "Thomas ist 52 Jahre alt. Bei einer Routineuntersuchung stellt sein Hausarzt erhöhte Leberwerte fest. Weitere Untersuchungen bringen Gewissheit: In seiner Leber haben sich mehrere Tumore gebildet, im übrigen Körper sind jedoch keine Metastasen nachweisbar.",
   

    panel2Variant: "textImage",
    panel2Text: "Thomas wird klar, dass diese frühe Entdeckung ihm neue Chancen eröffnet. Zum ersten Mal stellt er sich aktiv die Frage, wie er sein Leben und seine Gesundheit bewusst neu gestalten kann.",
    panel2ImageSrc: ThomasIll,
    panel2ImageAlt: "Thomas",
  }
},

{
  name: "Leber",
  props: {
    heading: "Was ist Leberkrebs?",

  }
},

{
  name: "Deutschland",
  props: {
    p1Left: "Thomas ist einer von jährlich etwa 8.790 neuen Fällen von diagnostiziertem Leberkrebs in Deutschland.",
    p1Right:
      "Besorgniserregend ist die Entwicklung der Fallzahlen über die Zeit. In den letzten 35 Jahren hat sich die Anzahl der jährlichen Neuerkrankungen bei Männern und Frauen verdoppelt. Die steigenden Fallzahlen der vergangenen Jahrzehnte verdeutlichen, wie wichtig Prävention und Früherkennung sind.",
    p2Left:
      "Auffällig ist dabei das Geschlechterverhältnis: Männer sind dreimal häufiger betroffen als Frauen.",
    p2ImageSrc: "ratio",
    p2ImageAlt: "Statistik",
    p3Text:
      "Das durchschnittliche Alter bei der Erstdiagnose von Leberkrebs unterscheidet sich leicht zwischen den Geschlechtern. Bei Männern liegt das Durchschnittsalter der Diagnose bei 69,9 Jahren, während es bei Frauen mit 72,1 Jahren geringfügig höher ist.",
  }
},

{
  name: "Organe",
  props: {
    heading: "Die Leber: ein besonderes Organ",

  }
},

{
  name: "Sectionsechs",
  props: {
    leftText:
      "Thomas erfährt, dass die Leber das größte und wichtigste Organ für die Verdauung von Nahrung und die Beseitigung von Giftstoffen ist. Ihm wird klar, welche Schlüsselrolle sie für seinen Körper spielt.",
    rightText:
      "Sie befindet sich im rechten Oberbauch, unterhalb des Herzens. Sie wird durch ein ausgedehntes Netz von Blutgefäßen versorgt und entwässert."
  }
},
{
  name: "Sectionsieben",
  props: {}
},
{
  name: "Sectionacht",
  props: {
    heading: "Wie macht sich Leberkrebs bemerkbar?",
    introText:
      "Da die Leber nicht schmerzempfindlich ist, verursacht der Leberkrebs zunächst keine Symptome bei Thomas. Im fortgeschrittenen Stadium äußert sich der Leberkrebs auf unterschiedliche Weise, die er rückblickend als Warnsignale erkennt.",

items: [
  { assetKey: "scale", text: "Abnehmen ohne Anstrengung" },
  { assetKey: "junkfood", text: "Appetitlosigkeit" },
  { assetKey: "temperature", text: "Erhöhte Temperatur" },
  { assetKey: "stroke", text: "Schmerzen im Oberbauch" },
  { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
  { assetKey: "nausea", text: "Schwellungen des Bauches" },
  { assetKey: "liver", text: "Gelbe Hautverfärbung" },
]
  }
},
{
  name: "Sectionneun",
  props: {
    heading: "Wie wird Leberkrebs diagnostiziert?",
    introRight: "Die Diagnostik soll klären, wie weit die Erkrankung fortgeschritten ist. Thomas ist zuversichtlich, denn der behandelnde Arzt bespricht alles Schritt für Schritt mit ihm.",
   

    q1Text: "1. Sind Tumore in der Leber vorhanden? Wenn ja, wie viele?",
    q1ImageSrc: LT1,
    q1ImageAlt: "Tumore in der Leber",

    methodsIntro: "Zum Auffinden von Lebertumoren können verschiedene bildgebende Verfahren eingesetzt werden, darunter:",
    method1ImageKey: "Ultrasound",
    method1Label: "Ultraschall",

    method2ImageKey: "CT",
    method2Label: "CT",

    method3ImageKey: "MRI",
    method3Label: "MRT",

    q2Text: "2. Wo genau befinden sich die Tumore?",
    q2ImageSrc: LT2,
    q2ImageAlt: "Lage der Tumore",

    q3Text: "3. Wie groß sind die Tumore?",
    q3ImageSrc: LT3,
    q3ImageAlt: "Größe der Tumore",

    q4Text: "4. Was ist der genaue Typ?",
    q4ImageSrc: LT4,
    q4ImageAlt: "Tumortyp",
  }
},

{
  name: "Sectionzehn",
  props: {
    heading: "Wie wird Leberkrebs behandelt?",
 

    l1Text:
      "Thomas erfährt das sein Behandlungsplan davon abhängt, wie weit die Krankheit fortgeschritten ist und in welchem Zustand sich seine Leber befindet.",
    l1ImageKey: "behandlung",
    l1ImageAlt: "Behandlung",

    l2LeftText:
      "Der Grad der Veränderung lässt sich nur durch eine mikroskopische Untersuchung der Krebszellen feststellen. Bei einer Biopsie wird eine kleine Probe des Lebergewebes entnommen und unter dem Mikroskop untersucht.",
    l2RightText:
      "Für die Therapieplanung ist es wichtig, das Ausmaß der Veränderung der Zellen zu verstehen. Der Schweregrad eines Tumors hängt davon ab, wie stark sich die Zellen bereits bösartig verändert haben.",

    l3LeftText:
      "Dank seines Alters und seiner Anstrengungen bezüglich seines Gesundheitszustands bestehen gute Chancen auf eine heilende Behandlung. Daher entscheidet sich Thomas gemeinsam mit seinem Behandlungsteam für diesen Weg.",
    l3ImageSrc: BiopsieImg,
    l3ImageAlt: "Biopsie",

    l3Order: "imageFirst"   // 👈 only difference
  }
},

{
  name: "Sectionelf",
  props: {
    heading: "Heilende Behandlung für Leberkrebs",


    l1RightText:
      "Bei chirurgischen Eingriffen werden Teile der Leber, die Tumore enthalten, entfernt.",
    l1ImageSrc: Curative2,
    l1ImageAlt: "Operation / Resektion",

    l2LeftText:
      "Tumore können auch mit einer Ablation behandelt werden. Dabei wird eine Nadel in den Tumor eingeführt, durch die Hitze oder Mikrowellen geleitet werden, um den Tumor zu zerstören.",
    l2ImageSrc: Curative3,
    l2ImageAlt: "Ablation",

    l3LeftText:
      "Darüber hinaus können winzige, mit radioaktivem Material gefüllte Kügelchen in die Lebergefäße eingebracht werden. Der Tumor wird lokal von innen bestrahlt, was zum Absterben der Tumorzellen führt.",
    l3ImageSrc: Curative4,
    l3ImageAlt: "Interne Strahlentherapie",
  }
},
{
  name: "Sectionzwoelf",
  props: {
    heading: "Palliative Behandlung für Leberkrebs",


    p1Text:
      "Zu einer palliativen Behandlung möchte Thomas es nicht kommen lassen, da diese nur noch das Tumorwachstum verlangsamen und die Symptome lindern würde.",

    p1Items: [
      { assetKey: "weight", text: "Abnehmen ohne Anstrengung" },
      { assetKey: "junkfood", text: "Appetitlosigkeit" },
      { assetKey: "temperature", text: "Erhöhte Temperatur" },
    ],

    p2Text:
      "Spezielle Chemotherapien verlangsamen das Tumorwachstum. Schmerzmittel und kalorienreiches Essen reduzieren die Symptome.",

    p2Items: [
      { assetKey: "pain", text: "Schmerzen im Oberbauch" },
      { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
      { assetKey: "weightgain", text: "Schwellungen des Bauches" },
    ],
  }
},
{
  name: "Sectiondreizehn",
  props: {
    heading: "Prognose von Leberkrebs",


    l1Text1: "Das hängt vom Stadium des Krebses und dem Zustand der Leber ab.",
    l1Text2: "5 Jahres Überlebensrate:",
    l1Rate: "18%",
   l1RateImageKey: "manandwoman",
    l1RateImageAlt: "man and woman",

    step1Label: "Tumor entfernt:",

    step2Text:
      "Stadium I Tumore (einzelne Tumore, ohne Befall der Blutgefäße oder Lymphknoten und ohne Fernmetastasen)",
    step2FemaleRate: "54%",
    step2FemaleIconKey: "woman",
    step2FemaleIconAlt: "woman",
    step2MaleRate: "62%",
    step2MaleIconKey: "man",
    step2MaleIconAlt: "man",

    step3Text: "Stadium IV Tumore (Lymphknotenbefall oder Fernmetastasen)",
    step3Rate: "2%",
    step3IconKey: "manandwoman",
    step3IconAlt: "statistic",
  }
},

{
  name: "Sectionvierzehn",
  props: {
    heading: "Wie kann ich Leberkrebs vorbeugen?",

    introText: "Einige RisikofaktIm Gespräch mit seinem Arzt erfährt Thomas, dass viele Risikofaktoren für Leberkrebs beeinflussbar sind. Diese Erkenntnis verändert seinen Blick auf die eigene Gesundheit.oren für Leberkrebs sind vermeidbar:",
    bullets: ["Hepatitis B", "Alkoholkonsum", "Übergewicht", "Rauchen"],
 items: [
  { assetKey: "vaccine", text: "Impfung gegen Hepatitis" },
  { assetKey: "alcohol", text: "Alkoholkonsum einschränken" },
  { assetKey: "weightgain", text: "Gewicht in einem gesunden Bereich halten" },
  { assetKey: "smoking", text: "Aufhören zu rauchen" },
],
  }
},
{
  name: "Sectionfuenfzehn",
  props: {
    heading: "Das Ergebnis von Thomas's Geschichte",


    l1Text:
      "Nach der heilenden Behandlung zeigen die Nachuntersuchungen, dass der Krebs verschwunden ist. Thomas spürt Erleichterung und Zuversicht, da die Therapie erfolgreich war. Die Ärzte erklären ihm, dass regelmäßige Nachkontrollen und ein gesunder Lebensstil weiterhin wichtig sind, um die Chancen auf ein dauerhaft krebsfreies Leben zu sichern",

    l2LeftText:
      "Thomas achtet nun bewusst auf einen gesünderen Lebensstil, um einem möglichen Rückfall seines Krebses vorzubeugen.",

    l2ImageSrc: ThomasAndDoctor,
    l2ImageAlt: "Thomas und Arzt",
  }
}
    
  ],

  C: [
    { name: "Hero", props: {       
    title: "Leberkrebs und die Konsequenzen",
      subtitle: "Eine interaktive Geschichte",
      author: "von LUISA FLAIG",
      scrollText: "zum Beginnen Scrollen",

      scrollTarget: "#definition"} 
    },
    {
  name: "Thomas",
  props: {
    heading: "Gibt es eine Chance auf Heilung?",
    body: "Thomas ist 52 Jahre alt. Bei einer Routineuntersuchung stellt sein Hausarzt erhöhte Leberwerte fest. Weitere Untersuchungen bringen Gewissheit: In seiner Leber haben sich mehrere Tumore gebildet, im übrigen Körper sind jedoch keine Metastasen nachweisbar.",


    panel2Variant: "textImage",
    panel2Text: "Zum ersten Mal wird Thomas bewusst, wie verletzlich seine Gesundheit ist. Er sieht sich mit der Frage konfrontiert, wie viel Kontrolle er überhaupt noch über sein Leben hat.",
    panel2ImageSrc: ThomasIll,
    panel2ImageAlt: "Thomas",
  }
},

{
  name: "Leber",
  props: {
    heading: "Was ist Leberkrebs?",

  }
},
{
  name: "Deutschland",
  props: {
    p1Left: "Thomas ist einer von jährlich etwa 8.790 neu diagnostizierten Fällen in Deutschland.",
    p1Right:
      "Besorgniserregend ist die Entwicklung der Fallzahlen über die Zeit. In den letzten 35 Jahren hat sich die Anzahl der jährlichen Neuerkrankungen bei Männern und Frauen verdoppelt. Die steigenden Fallzahlen der vergangenen Jahrzehnte verdeutlichen, wie fatal ein ungesunder Lebensstil, und das Ausblenden von Risiken ist.",
    p2Left:
      "Auffällig ist dabei das Geschlechterverhältnis: Männer sind dreimal häufiger betroffen als Frauen.",
    p2ImageSrc: "ratio",
    p2ImageAlt: "Statistik",
    p3Text:
      "Das durchschnittliche Alter bei der Erstdiagnose von Leberkrebs unterscheidet sich leicht zwischen den Geschlechtern. Bei Männern liegt das Durchschnittsalter der Diagnose bei 69,9 Jahren, während es bei Frauen mit 72,1 Jahren geringfügig höher ist.",
  }
},
{
  name: "Organe",
  props: {
    heading: "Die Leber: ein besonderes Organ",

  }
},

{
  name: "Sectionsechs",
  props: {
    leftText:
      "Thomas hatte nie viel über die Leber nachgedacht, obwohl sie das größte und wichtigste Organ für die Verdauung von Nahrung und die Beseitigung von Giftstoffen ist.",
    rightText:
      "Sie befindet sich im rechten Oberbauch, unterhalb des Herzens. Sie wird durch ein ausgedehntes Netz von Blutgefäßen versorgt und entwässert."
  }
},
{
  name: "Sectionsieben",
  props: {}
},

{
  name: "Sectionacht",
  props: {
    heading: "Wie macht sich Leberkrebs bemerkbar?",
    introText:
      "Da die Leber nicht schmerzempfindlich ist, verursacht der Leberkrebs zunächst keine Symptome bei Thomas. Im fortgeschrittenen Stadium äußert sich der Leberkrebs auf unterschiedliche Weise, die er rückblickend als Warnsignale hätte wahrnehmen können.",

items: [
  { assetKey: "scale", text: "Abnehmen ohne Anstrengung" },
  { assetKey: "junkfood", text: "Appetitlosigkeit" },
  { assetKey: "temperature", text: "Erhöhte Temperatur" },
  { assetKey: "stroke", text: "Schmerzen im Oberbauch" },
  { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
  { assetKey: "nausea", text: "Schwellungen des Bauches" },
  { assetKey: "liver", text: "Gelbe Hautverfärbung" },
]
  }
},
{
  name: "Sectionneun",
  props: {
    heading: "Wie wird Leberkrebs diagnostiziert?",
    introRight: "Die Diagnostik soll klären, wie weit die Erkrankung fortgeschritten ist. Für Thomas bedeutet jeder Untersuchungsschritt eine neue unangenehme Konfrontation mit seiner Situation.",


    q1Text: "1. Sind Tumore in der Leber vorhanden? Wenn ja, wie viele?",
    q1ImageSrc: LT1,
    q1ImageAlt: "Tumore in der Leber",

    methodsIntro: "Zum Auffinden von Lebertumoren können verschiedene bildgebende Verfahren eingesetzt werden, darunter:",
    method1ImageKey: "Ultrasound",
    method1Label: "Ultraschall",

    method2ImageKey: "CT",
    method2Label: "CT",

    method3ImageKey: "MRI",
    method3Label: "MRT",

    q2Text: "2. Wo genau befinden sich die Tumore?",
    q2ImageSrc: LT2,
    q2ImageAlt: "Lage der Tumore",

    q3Text: "3. Wie groß sind die Tumore?",
    q3ImageSrc: LT3,
    q3ImageAlt: "Größe der Tumore",

    q4Text: "4. Was ist der genaue Typ?",
    q4ImageSrc: LT4,
    q4ImageAlt: "Tumortyp",
  }
},

{
  name: "Sectionzehn",
  props: {
    heading: "Wie wird Leberkrebs behandelt?",


    l1Text:
      "Thomas erfährt das sein Behandlungsplan davon abhängt, wie weit die Krankheit fortgeschritten ist und in welchem Zustand sich seine Leber befindet.",
    l1ImageKey: "behandlung",
    l1ImageAlt: "Behandlung",

    l2LeftText:
      "Der Grad der Veränderung lässt sich nur durch eine mikroskopische Untersuchung der Krebszellen feststellen. Bei einer Biopsie wird eine kleine Probe des Lebergewebes entnommen und unter dem Mikroskop untersucht.",
    l2RightText:
      "Für die Therapieplanung ist es wichtig, das Ausmaß der Veränderung der Zellen zu verstehen. Der Schweregrad eines Tumors hängt davon ab, wie stark sich die Zellen bereits bösartig verändert haben.",

    l3LeftText:
      "Trotz seines Alters ist der allgemeine Gesundheitszustand von Thomas durch seine fehlende Einsicht und Verdrängung schlecht. Thomas entscheidet sich gemeinsam mit den behandelnden Ärzten zunächst für eine heilende Therapie.",
    l3ImageSrc: BiopsieImg,
    l3ImageAlt: "Biopsie",

    l3Order: "imageFirst"   // 👈 only difference
  }
},
{
  name: "Sectionzwoelf",
  props: {
    heading: "Palliative Behandlung für Leberkrebs",


    p1Text:
      "Da der Krebs bei Thomas nach der heilenden Behandlung zurückkomt, kann eine palliative Therapie  das Wachstum des Tumors nur noch verlangsamen und die Symptome lindern.",

    p1Items: [
      { assetKey: "weight", text: "Abnehmen ohne Anstrengung" },
      { assetKey: "junkfood", text: "Appetitlosigkeit" },
      { assetKey: "temperature", text: "Erhöhte Temperatur" },
    ],

    p2Text:
      "Spezielle Chemotherapien verlangsamen das Tumorwachstum. Schmerzmittel und kalorienreiches Essen reduzieren die Symptome.",

    p2Items: [
      { assetKey: "pain", text: "Schmerzen im Oberbauch" },
      { assetKey: "fatigue", text: "Schwäche und Müdigkeit" },
      { assetKey: "weightgain", text: "Schwellungen des Bauches" },
    ],
  }
},
{
  name: "Sectiondreizehn",
  props: {
    heading: "Prognose von Leberkrebs",


    l1Text1: "Das hängt vom Stadium des Krebses und dem Zustand der Leber ab.",
    l1Text2: "5 Jahres Überlebensrate:",
    l1Rate: "18%",
    l1RateImageSrc: "ManAndWoman",
    l1RateImageAlt: "man and woman",

    step1Label: "Tumor entfernt:",

    step2Text:
      "Stadium I Tumore (einzelne Tumore, ohne Befall der Blutgefäße oder Lymphknoten und ohne Fernmetastasen)",
    step2FemaleRate: "54%",
    step2FemaleIconSrc: "woman",
    step2FemaleIconAlt: "woman",
    step2MaleRate: "62%",
    step2MaleIconSrc: "man",
    step2MaleIconAlt: "man",

    step3Text: "Stadium IV Tumore (Lymphknotenbefall oder Fernmetastasen)",
    step3Rate: "2%",
    step3IconSrc: "ManAndWoman",
    step3IconAlt: "statistic",
  }
},
{
  name: "Sectionvierzehn",
  props: {
    heading: "Wie kann ich Leberkrebs vorbeugen?",

    introText: "Trotz vermeidbarer Risikofaktoren für Leberkrebs weigert sich Thomas, seinen ungesunden Lebensstil anzupassen.",
    bullets: ["Hepatitis B", "Alkoholkonsum", "Übergewicht", "Rauchen"],
items: [
  { assetKey: "vaccine", text: "Impfung gegen Hepatitis" },
  { assetKey: "alcohol", text: "Alkoholkonsum einschränken" },
  { assetKey: "weightgain", text: "Gewicht in einem gesunden Bereich halten" },
  { assetKey: "smoking", text: "Aufhören zu rauchen" },
],
  }
},

{
  name: "Sectionfuenfzehn",
  props: {
    heading: "Das Ergebnis von Thomas's Geschichte",


    l1Text:
      "Trotz palliativer Behandlung verschlechtert sich Thomas’ Zustand weiter; wenige Monate später stirbt er an den Folgen des Leberkrebses. Rückblickend wird deutlich, dass eine frühzeitige Änderung des Lebensstils seine Chancen auf eine Verlangsamung der Erkrankung hätte erhöhen können, da ein stabilerer Leberzustand den Krankheitsverlauf positiv beeinflusst hätte.",

    l2LeftText:
      "Thomas hat bewusst Gelegenheiten verpasst, die ihm hätten ein längeres Leben ermöglichen können.",

    l2ImageSrc: ThomasAndDoctor,
    l2ImageAlt: "Thomas und Arzt",
  }
},

  ]
};

narratives.B = reorderNarrativeByGroups(narratives.B, sectionGroupsByVersion.B);
narratives.C = reorderNarrativeByGroups(narratives.C, sectionGroupsByVersion.C);

export const componentMap = components;