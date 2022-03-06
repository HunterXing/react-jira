// @ts-ignore
const config = {
  oauth_uri: "https://github.com/login/oauth/authorize",
  redirect_uri: "http://notfound404.cn",
  client_id: "Iv1.85c13b1030749674",
  client_secret: "b941eed775728f080a1052f280d92165b9f6ae80",
};

// 本地开发环境下
if (process.env.NODE_ENV === "development") {
  config.redirect_uri = "http://localhost:3000";
  config.client_id = "Iv1.85c13b1030749674";
  config.client_secret = "b941eed775728f080a1052f280d92165b9f6ae80";
}
export default config;
