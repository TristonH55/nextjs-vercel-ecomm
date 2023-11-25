import Head from 'next/head'
// import {NextUIProvider} from "@nextui-org/react"
import useSWR from 'swr'
import { useRouter } from 'next/router'




//working code

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Page() {
    const router = useRouter();
    const { query : {slug} } = router
    console.log(router);

  const { data, error, isLoading } = useSWR(`/api/page/${slug}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;


  return (
    <div>
      <Head>
        <title>Create App</title>
        <link rel="stylesheet" href={'http://localhost/wordpress-scooter-site/wp-includes/css/dist/block-library/style.min.css'}/>
      </Head>
      <main>
        <h1>{data.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.page.content }} />
      </main>
    </div>
  );
}