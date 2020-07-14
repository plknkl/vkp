import gql from 'graphql-tag'

export const GET_OPERATIONS = gql`
  query {
    operations {
      name
      items
    }
  }
`

export const GET_OPERATION = gql`
  query operation($name: String!){
    operation(name: $name) {
      name
      items
    }
  }
`

export const CREATE_OPERATION = gql`
  mutation createOperation($name: String!, $items: String){
    createOperation(name: $name, items: $items) {
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
  mutation updateOperation($oldName: String!, $newName: String!, $items: String){
    updateOperation(oldName: $oldName, newName: $newName, items: $items) {
      name
    }
  }
`
