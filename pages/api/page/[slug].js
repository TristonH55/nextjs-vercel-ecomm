export default async (req, res) => {
    const { query: { slug } } = req;
    
    
    const QUERY_SINGLE_POST = `
    query SinglePost($id: ID!){
        page(id: $id, idType: URI) {
          title
          content
          slug
        }
      }
    `;
  
    const data = await fetch( process.env.WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: QUERY_SINGLE_POST,
        variables: {
          id: slug
        }
      })
    } );
  
    const json = await data.json();
    res.json(json.data);
  }
  