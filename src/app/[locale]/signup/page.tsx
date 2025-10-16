import SignupContent from "@/app/signup/SignupContent";
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
  const copy = dictionary.auth.signup;

  return {
    title: `${copy.title} | Startup`,
    description: copy.subtitle,
  };
}

const SignupPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <SignupContent
      copy={dictionary.auth.signup}
      forms={dictionary.forms}
      signinHref={`/${locale}/signin`}
    />
  );
};

export default SignupPage;
