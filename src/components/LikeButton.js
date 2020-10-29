import React, { useState, useEffect } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    <Button color="teal" basic={liked ? false : true}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup
      content={`${liked ? 'Unlike' : 'Like'} post`}
    >
      <Button as='div' labelPosition='right' onClick={user ? likePost : () => console.log('user not logged in')}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id likeCount
      likes { id username }
    }
  }
`;

export default LikeButton;
