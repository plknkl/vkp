import gql from 'graphql-tag'

export const GET_OPERATIONS = gql`
  query {
    operations {
      name
    }
  }
`

export const GET_OPERATION = gql`
  query operation($name: String!){
    operation(name: $name) {
      name
    }
  }
`

export const CREATE_OPERATION = gql`
  mutation createOperation($name: String!){
    createOperation(name: $name) {
      name
    }
  }
`

export const DELETE_OPERATION = gql`
  mutation deleteOperation($name: String!){
    deleteOperation(name: $name)
  }
`

export const UPDATE_OPERATION = gql`
  mutation updateOperation($oldName: String!, $newName: String!){
    updateOperation(oldName: $oldName, newName: $newName) {
      name
    }
  }
`
