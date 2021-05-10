
var amqp = require('amqplib/callback_api');

// 1. RabbitMQ 서버에 연결
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  // 2. 작업 채널생성
  connection.createChannel(function(error1, channel) {

    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    // 3. 메시지 큐 생성
    channel.assertQueue(queue, {
      durable: false
    });

    // 4. 큐에 메시지 게시
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  // 5. 연결을 닫고 종료
  setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);

});