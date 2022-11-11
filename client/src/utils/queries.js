import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      photo
      rating
      tasksPosted {
        _id
        name
        description
        value
        tag {
          name
        }
        doerId {
          username
        }
      }
      tasksAssigned {
        _id
        name
        description
        value
        tag {
          name
        }
        toerId {
          username
        }
      }
    }
  }
`;

export const QUERY_TASKS = gql`
  query getTasks {
    tasks {
      _id
      name
      description
      value
      dueDate
      tag
      toerId {
        username
      }
    }
  }
`;

export const QUERY_SINGLE_TASK = gql`
  query getSingleTask {
    task {
      _id
      name
      description
      value
      postDate
      dueDate
      completedDate
      tag {
        name
      }
      toerId {
        username
      }
      doerId {
        username
      }
    }
  }
`;

export const QUERY_TAG = gql`
  query getTag {
    _id
    name
  }
`;
