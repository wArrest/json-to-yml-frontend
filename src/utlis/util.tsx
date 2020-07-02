
const WebSocketTest = () => {
   if ("WebSocket" in window) {
      // 打开一个 web socket
      var ws = new WebSocket('ws://192.168.12.190:60000/ws');
      // 连接建立后的回调函数
      ws.onopen = function() {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("admin:123456");
      };
      
      // 接收到服务器消息后的回调函数
      ws.onmessage = (evt) => { 
        var received_msg = evt.data;
        if (received_msg.indexOf("sorry") == -1) {
          // console.log("收到消息：" + received_msg);
        }
      };
      
      // 连接关闭后的回调函数
      // ws.onclose = () => { 
      //    // 关闭 websocket
      //    alert("连接已关闭..."); 
      // };
  } else {
    // 浏览器不支持 WebSocket
    alert("您的浏览器不支持 WebSocket!");
  }
}

export {
  WebSocketTest
}
