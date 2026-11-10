// Language lists as shown on polydial.com/languages.
export const SUPPORTED = [
  ["af", "Afrikaans"], ["ar", "Arabic"], ["ca", "Catalan"], ["cs", "Czech"], ["cy", "Welsh"],
  ["da", "Danish"], ["de", "German"], ["en", "English"], ["es", "Spanish"], ["eu", "Basque"],
  ["fi", "Finnish"], ["fil", "Filipino"], ["fr", "French"], ["gl", "Galician"], ["hi", "Hindi"],
  ["hu", "Hungarian"], ["id", "Indonesian"], ["is", "Icelandic"], ["it", "Italian"], ["ja", "Japanese"],
  ["ko", "Korean"], ["lt", "Lithuanian"], ["lv", "Latvian"], ["ms", "Malay"], ["nb", "Norwegian"],
  ["nl", "Dutch"], ["pl", "Polish"], ["pt", "Portuguese"], ["ro", "Romanian"], ["ru", "Russian"],
  ["sk", "Slovak"], ["sv", "Swedish"], ["tr", "Turkish"], ["vi", "Vietnamese"], ["zh", "Chinese"],
];

export const COMING_SOON = [
  ["am", "Amharic"], ["bg", "Bulgarian"], ["bn", "Bengali"], ["cmn", "Mandarin Chinese"], ["el", "Greek"],
  ["gu", "Gujarati"], ["he", "Hebrew"], ["kn", "Kannada"], ["ml", "Malayalam"], ["mr", "Marathi"],
  ["pa", "Punjabi"], ["sr", "Serbian"], ["ta", "Tamil"], ["te", "Telugu"], ["th", "Thai"],
  ["uk", "Ukrainian"], ["yue", "Chinese (Cantonese)"],
];

export const LANGUAGE_COUNT = SUPPORTED.length + COMING_SOON.length;
