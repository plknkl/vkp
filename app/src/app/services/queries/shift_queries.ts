import gql from 'graphql-tag'

export const GET_SHIFTS = gql`
  query {
    shifts {
      name
    }
  }
`

export const GET_SHIFT = gql`
  query shift($name: String!){
    shift(name: $name) {
      name
    }
  }
`

export const CREATE_SHIFT = gql`
  mutation createShift($name: String!){
    createShift(name: $name) {
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
  mutation updateShift($oldName: String!, $newName: String!){
    updateShift(oldName: $oldName, newName: $newName) {
      name
    }
  }
`