const PROTO_PATH = `${__dirname}\\protos\\greeter.proto`;
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


const sayHello = (call, callback) => {
    callback(null, { message: 'Hello ' + call.request.name } )
}

const main = () => {
    const server = new grpc.Server();
    server.addService(greeter_proto.Greeter.service, { sayHello });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}
  
main();