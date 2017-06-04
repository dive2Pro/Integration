import * as cluster from 'cluster'

function startWorker() {
  // fork
  const woker = cluster.fork()
  console.log(`CLUSTER: Worker ${woker.id} started`);
}

if (cluster.isMaster) {
  // 为每个 cpu 启动了一个工作线程
  require('os').cpus().forEach(element => {startWorker()});

  // 记录所有断开的工作线程.
  // 如果工作线程断开了,它应该退出
  // 因此我们可以等待 exit 事件然后繁衍一个新工作线程来代替它
  cluster.on(
      'disconnect',
      worker => {console.log(
          `CLUSTER: Woker ${worker.id} disconnected from the cluster`)})
  // 当有工作线程死掉时, 创建一个工作线程代替它
  cluster.on('exit', (worker, code, signal) => {
    console.log(`CLUSTER: Worker ${worker.id} died with exit code ${code} (${signal})`)
    startWorker()
  })
} else {
  require('./server')();
}