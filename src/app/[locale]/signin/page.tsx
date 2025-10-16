import SigninContent from "@/app/signin/SigninContent";
import { getDictionary, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const copy = dictionary.auth.signin;

  return {
    title: `${copy.title} | Startup`,
    description: copy.subtitle,
  };
}

const SigninPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <SigninContent
      copy={dictionary.auth.signin}
      forms={dictionary.forms}
      signupHref={`/${locale}/signup`}
    />
  );
};

export default SigninPage;
