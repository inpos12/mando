import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_CLIENT_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    poolSize: 10, // 최대 연결 수를 10으로 설정
    waitQueueTimeoutMS: 30000, // 대기 시간 30초로 설정
    serverSelectionTimeoutMS: 10000, // 서버 선택 대기 시간 10초로 설정
  },
});

// MongoDB 연결 코드

//서버연결테스트 --
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
//  run().catch(console.dir);

export default client;
