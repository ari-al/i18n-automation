const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path");

const localeDefaultPack = require("./default-pack.json");

const creds = require("./.credentials/future-life-387705-eac49308a41a.json");
const spreadsheetDocId = "1c6rku90p9jf27N2_qYI-E9tPnsVU61OLEqn_qq_PUwk";
const ns = "translation";
const defaultTranslations = localeDefaultPack["default-translations"];
const lngs = Object.keys(defaultTranslations);
const localesPath = path.join(__dirname, "..", "app", "i18n", "locales");
const rePluralPostfix = new RegExp(/_plural|_[\d]/g);
const sheetId = 0; // your sheet id
const NOT_AVAILABLE_CELL = "_N/A";
const columnKeyToHeader = {
  key: "key",
  ...defaultTranslations[localeDefaultPack["default-language"]],
};

async function loadSpreadsheet() {
  // eslint-disable-next-line no-console
  console.info(
    "\u001B[32m",
    "=====================================================================================================================\n",
    // "# i18next auto-sync using Spreadsheet\n\n",
    // "  * Download translation resources from Spreadsheet and make /assets/locales/{{lng}}/{{ns}}.json\n",
    // "  * Upload translation resources to Spreadsheet.\n\n",
    `The Spreadsheet for translation is here (\u001B[34mhttps://docs.google.com/spreadsheets/d/${spreadsheetDocId}/#gid=${sheetId}\u001B[32m)\n`,
    "=====================================================================================================================",
    "\u001B[0m"
  );

  const doc = new GoogleSpreadsheet(spreadsheetDocId);

  // load directly from json file if not in secure environment
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  console.info(
    "\u001B[32m",
    "=====================================================================================================================\n",
    `Success load Google Spread sheet!\n`,
    "=====================================================================================================================",
    "\u001B[0m"
  );
  return doc;
}

function getPureKey(key = "") {
  return key.replace(rePluralPostfix, "");
}

module.exports = {
  localesPath,
  loadSpreadsheet,
  getPureKey,
  ns,
  lngs,
  sheetId,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
};
