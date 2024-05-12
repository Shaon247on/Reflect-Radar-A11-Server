const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

//Middleware


app.use(
    cors({
      origin: [
        "http://localhost:5173"
      ],
      credentials: true,
    })
  );
app.use(express.json())

//BattleField
//Nkec8TDo9pNjEmWk


//mongodb Connection


const uri = "mongodb+srv://BattleField:Nkec8TDo9pNjEmWk@cluster0.k4uag68.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const queriesCollection = client.db('BattleField').collection('Queries')
        const recommendationCollection = client.db('BattleField').collection('Recommendation')

        

        app.get('/queries', async (req, res) => {
            const result = await queriesCollection.find().toArray()
            res.send(result)
        })

        //get single job doc using id

        app.get('/query/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await queriesCollection.findOne(query)
            res.send(result)
        })

        //get single recommendation doc using id

        
        app.get('/recommend/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await recommendationCollection.findOne(query)
            res.send(result)
        })


        //get single recommendation doc using postid

        
        app.get('/recommends/:id', async (req, res) => {
            const id = req.params.id
            const query = { postId: id }
            const result = await recommendationCollection.find(query).toArray()
            res.send(result)
        })


        app.get('/recommend', async (req, res) => {
            const result = await recommendationCollection.find().toArray()
            res.send(result)
        })

        app.get('/recommend/:id', async (req, res)=>{
            const id = req.params.id
        })

        //save a recommendation

        app.post('/recommend', async (req, res)=>{
            const recData = req.body
            console.log(recData);            
            const result = await recommendationCollection.insertOne(recData)
            res.send(result)
            
        })

        


        // get all queries for particular user by email

        // app.get('/queries/:email', async (req, res) => {
        //     const email = req.params.email
        //     const query = { UserEmail: email }
        //     const result = await queriesCollection.find(query).toArray()
        //     res.send(result)
        // })


        


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Battle is on')
})

app.listen(port, () => {
    console.log(`Battle is going on server: ${port}`)
})