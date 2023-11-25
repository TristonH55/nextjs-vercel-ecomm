// import Head from 'next/head'
// import { GetStaticProps } from 'next'
// import Container from '../components/container'
// import MoreStories from '../components/more-stories'
// import HeroPost from '../components/hero-post'
// import Intro from '../components/intro'
// import Layout from '../components/layout'
// import { getAllPostsForHome } from '../lib/api'
// import { CMS_NAME } from '../lib/constants'

// import {NextUIProvider} from "@nextui-org/react"
import useSWR from 'swr'

// export default function Index({ allPosts: { edges }, preview }) {

//   const heroPost = edges[0]?.node
//   const morePosts = edges.slice(1)
//   const data = fetch('http://localhost/wordpress-scooter-site/graphql', {
//     headers: { 'Content-Type': 'application/json' },
//     method: 'POST',
//     body: JSON.stringify({ 'test': 'value' })
    
//   })
  

  
//   return (
  

//     <Layout preview={preview}>
//       <Head>
//         <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
//       </Head>
//       <Container>
//         <Intro />
//         {heroPost && (
//           <HeroPost
//             title={heroPost.title}
//             coverImage={heroPost.featuredImage}
//             date={heroPost.date}
//             author={heroPost.author}
//             slug={heroPost.slug}
//             excerpt={heroPost.excerpt}
//           />
//         )}
//         {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        
//       </Container>
//     </Layout>
//   )
// }

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPosts = await getAllPostsForHome(preview)



//   return {
//     props: { allPosts, preview },
//     revalidate: 10,
//   }
// }







//working code

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
export default function Home() {
  const { data, error, isLoading } = useSWR('/api/page/home', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  console.log(data);
  

  return (
    <div>
      
        <title>Creat App</title>
      
      <main>
        <h1>{data.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.page.content}}/>
      </main>
    </div>
  )
}
