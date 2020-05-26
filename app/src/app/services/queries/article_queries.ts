import gql from 'graphql-tag'

export const GET_ARTICLES = gql`
  query {
    articles {
      name
    }
  }
`

export const GET_ARTICLE = gql`
  query article($name: String!){
    article(name: $name) {
      name
    }
  }
`

export const CREATE_ARTICLE = gql`
  mutation createArticle($name: String!){
    createArticle(name: $name) {
      name
    }
  }
`

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($name: String!){
    deleteArticle(name: $name)
  }
`

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($oldName: String!, $newName: String!){
    updateArticle(oldName: $oldName, newName: $newName) {
      name
    }
  }
`