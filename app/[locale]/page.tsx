import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("Home");

  return (
    <div>
      <h1>{t("h1")}</h1>
    </div>
  )
}
