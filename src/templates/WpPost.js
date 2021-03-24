import React from 'react';
import {
    graphql,
    Link as GatsbyLink
} from 'gatsby';
import { Helmet } from 'react-helmet/es/Helmet';

const WpPost = ({ data }) => {
    const { wpPost } = data,
        metaDescription = typeof(wpPost.seo) !=='undefined' && typeof(wpPost.seo.metaDesc) !== 'undefined' ? wpPost.seo.metaDesc : wpPost.title;
console.log(wpPost);
    return (
        <>
            <Helmet>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <div>
                <div>{ wpPost.title }</div>
                <div>
                    <span dangerouslySetInnerHTML={{
                        __html: wpPost.content
                    }} />
                    
                    <GatsbyLink to="/">Back to Blog</GatsbyLink>
                </div>
            </div>
        </>
    );
}

export default WpPost;

export const query = graphql`
    query PostById($id:String) {
        wpPost(id: {eq: $id}) {
            __typename
            content
            id
            uri
            seo {
                metaDesc
            }
            title
        }
    }
`