import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId, commentId, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId, commentId },
    update(proxy) {
      setConfirmOpen(false);

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
  
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId)
          }
        });
      }
      
      if (onDelete) onDelete();
    }
  });

  return (
    <>
      <MyPopup
        content={`Delete ${commentId ? 'comment' : 'post'}`}
      >
        <Button
          as="div"
          color="red"
          onClick={() => setConfirmOpen(true)}
          floated="right"
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id username createdAt body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
