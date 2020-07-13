import gql from 'graphql-tag'

export const GET_SHOPS = gql`
  query {
    shops {
      name
    }
  }
`

export const GET_SHOP = gql`
  query shop($name: String!){
    shop(name: $name) {
      name
    }
  }
`

export const CREATE_SHOP = gql`
  mutation createShop($name: String!){
    createShop(name: $name) {
      name
    }
  }
`

export const DELETE_SHOP = gql`
  mutation deleteShop($name: String!){
    deleteShop(name: $name)
  }
`

export const UPDATE_SHOP = gql`
  mutation updateShop($oldName: String!, $newName: String!){
    updateShop(oldName: $oldName, newName: $newName) {
      name
    }
  }
`
