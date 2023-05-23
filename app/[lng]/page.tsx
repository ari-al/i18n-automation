import { useTranslation } from "../i18n";

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return <h1>{t("pageTitle")}</h1>;
}
