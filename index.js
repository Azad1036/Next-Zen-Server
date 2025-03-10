const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 4000;

// MidelWare
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Run Express Js");
});

async function mainDB() {
  const compaignCollection = client.db("compaignDB").collection("compaign");
  const donatedCollection = client.db("donatedDB").collection("donation");
  try {
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    // Display Campaign
    app.get("/campaigns", async (req, res) => {
      const allCampaignData = compaignCollection.find();
      const result = await allCampaignData.toArray();
      res.send(result);
    });

    app.get("/campaign/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const quary = { _id: new ObjectId(id) };
      const user = await compaignCollection.findOne(quary);
      res.send(user);
    });

    // my Campaign
    app.get("/myCampaign/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const quary = { email };
      const findEmail = compaignCollection.find(quary);
      const result = await findEmail.toArray();
      res.send(result);
    });

    // Add Campaign
    app.post("/addCampaign", async (req, res) => {
      const addCampaignData = req.body;
      // console.log(body);
      const result = await compaignCollection.insertOne(addCampaignData);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    await client.close();
  }

  // Donation Releted api
  app.post("/donationUser", async (req, res) => {
    const donatedUser = req.body;
    const result = await donatedCollection.insertOne(donatedUser);
    res.send(result);
  });
}

mainDB();

app.listen(port, () => {
  console.log(`Runing Server Port ${port}`);
});
