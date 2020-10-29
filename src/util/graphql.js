import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    username
    body
    likes { id username }
    comments { id body username }
    createdAt
    likeCount
    commentCount
  }
}
`;
