const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 4000;

// MidelWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@firstproject.mz7uu.mongodb.net/?retryWrites=true&w=majority&appName=FirstProject`;

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
    // Display Campaign
    app.get("/campaigns", async (req, res) => {
      const allCampaignData = compaignCollection.find();
      const result = await allCampaignData.toArray();
      res.send(result);
    });

    app.get("/runningCampaigns", async (req, res) => {
      const allCampaignData = compaignCollection.find().limit(6);
      const result = await allCampaignData.toArray();
      res.send(result);
    });

    app.get("/campaign/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const user = await compaignCollection.findOne(quary);
      res.send(user);
    });

    // my Campaign
    app.get("/myCampaign/:email", async (req, res) => {
      const email = req.params.email;
      const quary = { email };
      const findEmail = compaignCollection.find(quary);
      const result = await findEmail.toArray();
      res.send(result);
    });

    // Add Campaign
    app.post("/addCampaign", async (req, res) => {
      const addCampaignData = req.body;
      const result = await compaignCollection.insertOne(addCampaignData);
      res.send(result);
    });

    // update campaing
    app.put("/updateCampaign/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateCampaign = {
        $set: {
          photoUrl: user.photoUrl,
          campaignTitle: user.campaignTitle,
          campaignType: user.campaignType,
          donationAmount: user.donationAmount,
          description: user.description,
          date: user.date,
        },
      };
      const result = await compaignCollection.updateOne(
        quary,
        updateCampaign,
        option
      );
      res.send(result);
    });

    // Delected Campaign
    app.delete("/campaign/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const deleteUser = await compaignCollection.deleteOne(quary);
      res.send(deleteUser);
    });

    // Donation Releted api
    // my donation
    app.get("/myDonation/:email", async (req, res) => {
      const email = req.params.email;
      const quary = { email };
      const findEmail = donatedCollection.find(quary);
      const result = await findEmail.toArray();
      res.send(result);
    });

    app.post("/donationUser", async (req, res) => {
      const donatedUser = req.body;
      const result = await donatedCollection.insertOne(donatedUser);
      res.send(result);
    });
  } catch (error) {
    // await client.close();
  }
}

mainDB();

app.listen(port, () => {
  console.log(`Runing Server Port ${port}`);
});
