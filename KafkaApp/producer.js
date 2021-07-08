const { Kafka } = require('kafkajs');

// 1.Instantiating kafka

const username = 'SJ335XIPE5Q5ZPYS'
const password = 'r4kpR3eQXiEEsH6CVvTfILuDaO3MIDRPgiXSM9fWLd3dVqmWDT4qafdCc9W9aKbF'


const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

// const { REQUEST } = producer.events;
// const prod = producer.on(REQUEST, async (e) => {
//   const {timestamp, payload } = e;
//   let time = timeStampe.toString();
//   // connect to web socket
//   prod();
// })



// const kafka = new Kafka({
//   clientId: 'npm-slack-notifier',
//   brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
//   ssl,
//   sasl
// })

const config = {
  clientId: 'npm-slack-notifier',
  brokers: ['pkc-ep9mm.us-east-2.aws.confluent.cloud:9092'],
  kafka_topic: 'npm-package-published',
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};

// console.log('Line 31');
const kafka = new Kafka(config);
// 2.Creating Kafka Producer
const producer = kafka.producer();
// console.log('Line 35')
const runProducer = async () => {
  // const message = {
  //   "event":"package:publish",
  //   "package":"@kafkajs/zstd",
  //   "version":"1.0.0",
  //   "hookOwner":{"username":"nevon"},
  //   "payload":{"name":"@kafkajs/zstd"},
  //   "change":{"version":"1.0.0"},
  //   "time":1603444214995
  // }

  const message = { "hot" : "dog"};
  // 3.Connecting producer to kafka broker.
  console.log("Connecting...")
  await producer.connect()
  console.log("Connected!")

  // const intervalProducerFunc = () => {
  //   setInterval(async function(){ 
  //     await producer.send({
  //       topic: 'bbqchicken',
  //       messages:
  //       [{ value: JSON.stringify(message) }],
  //       })
  //   }, 10000);
  // }
  // intervalProducerFunc();

  function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
  }
  
  async function printy() {
    for (let i = 0; i < 5; ++i) {
        await waitforme(5000);
        console.log(i);
        await producer.send({
          topic: 'npm-package-published',
          messages:
          [{ value: JSON.stringify(message) }],
          })

        
        const { REQUEST } = producer.events;
        const prod = producer.on(REQUEST, async (e) => {
          const {timestamp, payload } = e;
          // let time = timeStamp.toString();
          // console.log("Line 92 event", e);
          // console.log("timestamp", timestamp);
          // console.log("payload", payload);

          // connect to web socket
          prod();
        })
    }
    console.log("Loop execution finished!");
  }
  
  printy();

  // for(let i = 0; i < 3; i++){
  //   await producer.send({
  //     topic: 'npm-package-published',
  //     messages:
  //     [{ value: JSON.stringify(message) }],
  //     })
  // }


  // await producer.send({
  // topic: 'npm-package-published',
  // messages:
  // [{ value: JSON.stringify(message) }],
  // })
}

runProducer();