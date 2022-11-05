import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($taskText: String!) {
    addTask(taskText: $taskText) {
      _id
      description
      toerId
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($taskText: String!) {
    editTask(taskText: $taskText) {
      _id
      description
      toerId
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskText: String!) {
    deleteTask(taskText: $taskText) {
      _id
      description
      toerId
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      description
      toerId
      doerId
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($thoughtId: ID!, $commentText: String!) {
    removeComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      description
      toerId
      doerId
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
