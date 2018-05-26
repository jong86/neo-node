// Express
const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000;

const neonjs = require('@cityofzion/neon-js')
const Neon = neonjs.default
const neoNodeURL = 'http://seed3.cityofzion.io:8080'
const client = Neon.create.rpcClient(neoNodeURL)


app.get('/validate_address', async (req, res) => {
  try {
    const response = await client.validateAddress(req.query.address)
    res.status(200).json({ is_valid: response })
  } catch (e) {
    res.status(500).json({ error: "Error processing request" })
  }
})

app.get('/block_height', async (req, res) => {
  try {
    const count = await client.getBlockCount()
    res.status(200).json({ block_height: count })
  } catch (e) {
    res.status(500).json({ error: "Error processing request" })
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







