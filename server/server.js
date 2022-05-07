import app from "./app";
import config from "./config/index"

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 서버가 시작되었습니다.`);
});