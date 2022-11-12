import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
        postDate
        tag {
          name
        }
        toerId
        doerId
      }
      tasksAssigned {
        _id
        name
        description
        value
        postDate
        tag {
          name
        }
        toerId
        doerId
      }
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
        postDate
        tag {
          name
        }
        toerId
        doerId
      }
      tasksAssigned {
        _id
        name
        description
        value
        postDate
        tag {
          name
        }
        toerId
        doerId
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
      postDate
      tag {
        name
      }
      toerId
      doerId
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
      postDate
      completedDate
      tag {
        name
      }
      toerId
      doerId
    }
  }
`;

export const QUERY_TAG = gql`
  query getTag {
    _id
    name
  }
`;
