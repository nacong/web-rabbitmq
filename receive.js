
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        // 1. 연결 -> 2. 채널 생성 -> 3. 큐 생성  여기까진 send.js 와 동일
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] %s 에서 메시지를 기다리는 중. 종료하려면 CTRL+C", queue);

        // 메시지를 비동기 적으로 푸시하므로 RabbitMQ가 메시지를 소비자에게 푸시 할 때 실행되는 콜백을 제공합니다.
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});