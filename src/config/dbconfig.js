import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_CLIENT_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    poolSize: 20, // 최대 20개의 연결을 사용할 수 있게 설정
    waitQueueTimeoutMS: 10000, // 연결 풀 대기시간 10초로 설정
    serverSelectionTimeoutMS: 5000, // 서버 선택 타임아웃 5초로 설정
  },
});

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
