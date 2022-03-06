/*
 * @description:  why-did-you-render
 * @Date: 2022-03-06 22:19:42`
 * @Author: xingheng
 */
import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
