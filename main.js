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

const mainnetNeo = new Neo(options)

mainnetNeo.mesh.on('ready', () => {
  app.get('/validate_address/:address', async (req, res) => {
    try {
      await mainnetNeo.mesh.rpc('validateAddress', req.params.address)
        .then((resNeo) => res.send(resNeo))
    } catch (e) {
      console.log(e.toString())
    }
  })

  process.on('unhandledRejection', (reason, p) => {
    console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
  })

  app.listen(PORT, () => console.log('Neo node running on port ' + PORT))
})







