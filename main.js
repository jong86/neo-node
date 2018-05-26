// Express
const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000;

// Neo-js
const Neo = require('@cityofzion/neo-js')
const NETWORK = 'mainnet'
const DB_CONNECTION_STRING = 'mongodb://localhost/mainnet'
const options = {
  network: NETWORK,
  storageOptions: {
    model: 'mongoDB',
    dataAccessOptions: {
      connectOnInit: true,
      connectionString: DB_CONNECTION_STRING,
      collectionNames: {
        blocks: 'b_neo_m_blocks',
        transactions: 'b_neo_m_transactions',
        addresses: 'b_neo_m_addresses'
      }
    }
  }
}

const neo = new Neo(options)

neo.mesh.on('ready', () => {
  app.get('/validate_address', async (req, res) => {
    try {
      await neo.mesh.rpc('validateAddress', req.query.address)
        .then((resNeo) => res.status(200).json(resNeo))
    } catch (e) {
      console.log(e.toString())
    }
  })

  app.get('/block_height', async (req, res) => {
    try {
      await neo.mesh.rpc('getBlockCount')
        .then((resNeo) => res.status(200).json({ block_height: resNeo }))
    } catch (e) {
      console.log(e.toString());
    }
  })

  app.post('/test_invoke', async (req, res) => {
    const { scriptHash, operation, params } = req

    try {
      await neo.mesh.rpc('invokeTransaction')
        .then((resNeo) => res.status(200).json({ block_height: resNeo }))
    } catch (e) {
      console.log(e.toString());
    }
  })

  app.post('/send_transaction', async (req, res) => {

    try {
      await neo.mesh.rpc('invokeTransaction')
        .then((resNeo) => res.status(200).json({ block_height: resNeo }))
    } catch (e) {
      console.log(e.toString());
    }
  })

  process.on('unhandledRejection', (reason, p) => {
    console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
  })

  app.listen(PORT, () => console.log('Neo node running on port ' + PORT))
})







