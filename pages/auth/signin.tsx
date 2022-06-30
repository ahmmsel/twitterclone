import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Signin = (props: any) => {
  const router = useRouter();

  const handleNavigate = (url: string) => {
    return () => {
      router.push(url);
    };
  };

  return (
    <>
      <Head>
        <title>Signin | Twitter</title>
      </Head>
      <div className="flex flex-col justify-center items-center gap-4 h-screen">
        <div
          className="relative w-36 h-36"
          role="button"
          onClick={handleNavigate("/")}>
          <Image src="/logo.svg" layout="fill" objectFit="contain" />
        </div>
        {Object.values(props.providers).map((provider: any) => (
          <button
            key={provider.name}
            className="uppercase font-semibold text-blue-400 text-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            signin with google
          </button>
        ))}
      </div>
    </>
  );
};

export default Signin;

export async function getServerSideProps(context: any) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
