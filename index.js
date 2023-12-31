const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const { connection } = require("./query");

const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");

// 首页
router.get("/", async (ctx) => {
  ctx.body = homePage;
});

router.post("/login", async (ctx) => {
  const { request } = ctx;
  const { prarms } = request.body;
  if (prarms.pwd && prarms.user) {
    if (prarms.pwd === "258425" && prarms.user === "piggy") {
      ctx.body = {
        code: 200,
        data: "登录成功",
      };
    } else {
      ctx.body = {
        code: 200,
        data: "登录失败",
      };
    }
  }
});

router.post("/add", async (ctx) => {
  const { request } = ctx;
  const { prarms } = request.body;
  const { type, money, time, remark } = prarms;
  const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
  console.log(
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_ADDRESS,
    type,
    money,
    time,
    remark
  );

  const statement =
    "INSERT INTO bookings_list (user, type, money, time, remark) VALUES (?, ?, ?, ?, ?);";
  const [results, fields] = await connection
    .promise()
    .execute(statement, ["piggy", type, money, time, remark]);
  console.log("数据库执行:", results);
  ctx.body = { results, fields };
});

// 获取计数
router.get("/api/count", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    code: 0,
    data: result,
  };
});

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const port = 80;
function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
console.log(connection, "connection");
bootstrap();
