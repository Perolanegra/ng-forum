import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import RabbitmqServer from '../../core/rabbitmq/rabbitmq-server';

@Injectable()
export class ChatService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<any | undefined> {
        const url = `${environment.server}/chat/list`;
        return this.http.get(url, { params: {} }) as Observable<any>;
    }

    public async addMessage(payload: any) {
        // const server = new RabbitmqServer('amqps://kogbaxwo:Q-gJpZFqA6Y06EZFVjSbJQgbiuozTkaF@codfish.rmq.cloudamqp.com/kogbaxwo', 'ngforumChat');
        // await server.start();
        // server.publishInQueue(payload);
    }
}