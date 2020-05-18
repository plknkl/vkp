import gql from 'graphql-tag'

export const GET_OPERATIONS = gql`
  query {
    operations {
      name
      description
    }
  }
`

export const GET_OPERATION = gql`
  query operation($name: String!){
    operation(name: $name) {
      name
      description
    }
  }
`

export const CREATE_OPERATION = gql`
  mutation createOperation($name: String!, $description: String!){
    createOperation(name: $name, description: $description) {
      name
      description
    }
  }
`

export const DELETE_OPERATION = gql`
  mutation deleteOperation($name: String!){
    deleteOperation(name: $name)
  }
`

export const UPDATE_OPERATION = gql`
  mutation updateOperation($oldName: String!, $newName: String!, $description: String){
    updateOperation(oldName: $oldName, newName: $newName, description: $description) {
      name
      description
    }
  }
`