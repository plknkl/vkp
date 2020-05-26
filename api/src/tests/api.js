import axios from 'axios'

const API_URL = 'http://localhost:8000/graphql'

// #region Actor
export const actors = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        actors {
          name
          status
        }
      }
    `,
    variables
  })

export const updateActorStatus = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($name: String!, $status: String!) {
        updateActorStatus (name: $name, status: $status) {
          name
          status
        }
      }
    `,
    variables
  })

export const startActorProcess = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($actorName: String!, $batchBusinessId: String!, $articleName: String!) {
        startActorProcess (
          actorName: $actorName,
          batchBusinessId: $batchBusinessId,
          articleName: $articleName
        ) {
          name
        }
      }
    `,
    variables
  })

export const interruptActorProcess = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($actorName: String!) {
        interruptActorProcess (
          actorName: $actorName,
        ) {
          name
          status
        }
      }
    `,
    variables
  })

export const finishActorProcess = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($actorName: String!, $quantity: Int) {
        finishActorProcess (
          actorName: $actorName,
          quantity: $quantity
        ) {
          name
          status
        }
      }
    `,
    variables
  })

export const breakActor = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($actorName: String!) {
        breakActor (
          actorName: $actorName,
        ) {
          name
          status
        }
      }
    `,
    variables
  })

export const updateActorOperation = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($actorName: String!, $operationName: String!) {
        updateActorOperation (actorName: $actorName, operationName: $operationName) {
          name
          operation {
            name
          }
        }
      }
    `,
    variables
  })
// #endregion

// #region Batch
export const batches = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        batches {
          businessId
        }
      }
    `,
    variables
  })
// #endregion

// #region Operation
export const operations = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        operations {
          description
          name
          unit
        }
      }
    `,
    variables
  })
// #endregion

// #region Job
export const jobs = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        jobs {
          status
          startedAt
          endedAt
        }
      }
    `,
    variables
  })
// #endregion

// #region Log

export const logs = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        logs {
          entityType
        }
      }
    `,
    variables
  })
// #endregion
