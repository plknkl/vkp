import gql from 'graphql-tag'

export const GET_SHIFTS = gql`
  query {
    shifts {
      name
      shop {
        name
      }
    }
  }
`

export const GET_SHIFT = gql`
  query shift($name: String!){
    shift(name: $name) {
      name
      shop {
        name
      }
    }
  }
`

export const CREATE_SHIFT = gql`
  mutation createShift($name: String!, $shopName: String!){
    createShift(name: $name, shopName: $shopName) {
      name
    }
  }
`

export const DELETE_SHIFT = gql`
  mutation deleteShift($name: String!){
    deleteShift(name: $name)
  }
`

export const UPDATE_SHIFT = gql`
  mutation updateShift($oldName: String!, $newName: String!, $shopName: String!){
    updateShift(oldName: $oldName, newName: $newName, shopName: $shopName) {
      name
    }
  }
`
