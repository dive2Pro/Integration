import {worker} from 'cluster'
import * as domain from 'domain'


export default () => {
  let server: any = {};
  const middleWare = function(req, res, next) {
    const d = domain.create()
    d.on('error', (err) => {
      try {
        /**
         *  这个 5 秒的时间选取取决于程序的情况
         */
        // 在 5 秒内进行故障保护关机
        setTimeout(() => {
          console.log(`Failsafe shutdown!`)
          process.exit(1)
        }, 5000);

          // 从集群中断开
          if (worker) {
            worker.disconnect()
          };
          server.close();
          try {
            // 交由 Express 错误路由处理
            next(err)
          } catch (err) {
            // 如果 Express 错误路由失效, 尝试返回普通文本响应
            console.error(`Express error mechanism failed.`, err.stack)
            res.status(500)
            res.setHeader('content-type', 'text/plain')
            res.end('Server error')
          }
      } catch (err) {
        console.error(`Unable to send 500 response.\n`, err.stack)
      }
    })

    // 向域中添加请求和响应对象
    d.add(req)
    d.add(res)

    // 执行该域中剩余的请求链
    d.run(next)
  };
  return {
    middleWare, setServer: (sv) => {
      server = sv
    }
  }
}