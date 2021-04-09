// import { Connection, Channel, connect } from "amqplib";


export default class RabbitmqServer {
    // private conn: Connection;
    // private channel: Channel;

    constructor(private uri: string, private queue: string) { }

    async start() {
        // var exchange = connection.declareExchange("ExchangeName");
        // queue.bind(exchange);
    }

    // async start(): Promise<void> {
    //     this.conn = await connect(this.uri);
    //     this.channel = await this.conn.createChannel();
    // }

    // async publishInQueue(queue: string, message: string) {
    //     return this.channel.sendToQueue(queue, Buffer.from(message));
    // }

    // async publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean> {
    //     return this.channel.publish(exchange, routingKey, Buffer.from(message));
    // }

}