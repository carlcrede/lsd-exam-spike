const PROTO_PATH = `${__dirname}/protos/greeter.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
const greeter_proto = protoDescriptor.greeter;

const main = () => {
    const target = 'localhost:50051';
    const client = new greeter_proto.Greeter(target, grpc.credentials.createInsecure());

    const name = 'John';
    client.sayHello({ name, age: 10 }, (err, res) => {
        console.log('Greeting: ', res.message);
    });
}

main();