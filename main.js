/*
 * Setup
 */

// Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 7000;

// Neo
const neonjs = require('@cityofzion/neon-js')
const Neon = neonjs.default
const { tx } = Neon;
const neoNodeURL = 'http://node2.sgp1.bridgeprotocol.io:10332'
const client = Neon.create.rpcClient(neoNodeURL)


/*
 * Global middleware
 */

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/*
 * API Routes
 */

app.get('/validate_address', async (req, res) => {
  try {
    const response = await client.validateAddress(req.query.address)
    res.status(200).json({ is_valid: response })
  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
})

app.get('/block_height', async (req, res) => {
  try {
    const count = await client.getBlockCount()
    res.status(200).json({ block_height: count })
  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
})

app.post('/test_invoke', async (req, res) => {
  const { script_hash, operation, params } = req.body

  try {
    const response = await client.invokeFunction(script_hash, operation, params)
    res.status(200).json({ response })
  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
})

app.post('/send_transaction', async (req, res) => {
  const { script_hash, operation, params } = req

  // type 128 = contract tx
  let tx = Neon.create.tx({type: 128})

  // Now let us add an intention to send 1 NEO to someone
  tx
  .addOutput('NEO', 1, 'AejuXe35UddamgR6dLNgaCSEhe1acKi3Zz')
  // Add an remark
  .addRemark('I am sending 1 NEO to someAddress')
  // Now we add in the balance we retrieve from an external API and calculate the required inputs.
  // .calculate(100)
  // Sign with the private key of the balance
  // .sign(private_key)

  // Store the hash so we can use it to query a block explorer.
  const hash = tx.hash

  // Now we can use this serializedTx string and send it through sendrawtransaction RPC call.
  const serializedTx = tx.serialize()

  try {
    const response = await client.sendRawTransaction(serializedTx)
    res.status(200).json({ message: "Not implemented yet, just returning sample tx data", tx, hash, serializedTx, response })
  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
})


/*
 * Error handling
 */

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})


/*
 * Listen
 */

app.listen(PORT, () => console.log('Neo node running on port ' + PORT))
