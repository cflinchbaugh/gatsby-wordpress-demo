import React from 'react';
import {
    graphql,
    Link as GatsbyLink
} from 'gatsby';

const WpPost = ({ data }) => {
    const { wpPost } = data;

    return (
        <div>
            <div>{ wpPost.title }</div>
            <div>
                <span dangerouslySetInnerHTML={{
                    __html: wpPost.content
                }} />
                
                <GatsbyLink to="/">Back to Blog</GatsbyLink>
            </div>
        </div>
    );
}

export default WpPost;

export const query = graphql`
    query PostById($id:String) {
        wpPost(id: {eq: $id}) {
            __typename
            id
            uri
            title
            content
        }
    }
`