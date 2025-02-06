import { useRouter } from "next/router";
import DetailsPage from "@/components/templates/DetailsPage";

function Details({ data }) {
  console.log(data);

  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading Page...</h2>;
  }

  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 10);
  const paths = data.map((food) => {
    return {
      params: { menuId: food.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { menuId },
  } = context;

  try {
    const res = await fetch(`${process.env.BASE_URL}/data/${menuId}`);
    const data = await res.json();

    if (!data || !data.id) {
      return {
        notFound: true,
      };
    }
    return { props: { data }, revalidate: +process.env.REVALIDATE };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
}
