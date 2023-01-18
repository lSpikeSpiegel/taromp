import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtIcon } from "taro-ui";
import "./index.scss";

export default function Nav(props) {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const setHeight = (val) => {
    setNavBarHeight(() => val);
  };
  const goBack = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  // 模拟componentDidMount，即只运行一次该函数
  useEffect(() => {
    const menuButtonObject = Taro.getMenuButtonBoundingClientRect();
    const sysInfo = Taro.getSystemInfoSync();
    const statusBarHeight = sysInfo.statusBarHeight;
    const menuButtonHeight = menuButtonObject.height;
    const menuButtonTop = menuButtonObject.top;
    const calcHeight =
      statusBarHeight +
      menuButtonHeight +
      (menuButtonTop - statusBarHeight) * 2;
    setHeight(calcHeight);
  }, []);

  return (
    <div className="myNav" style={{ height: `${navBarHeight}px` }}>
      <AtIcon
        className={`myNavBack ${props.hideBack ? "hide" : ""}`}
        value="chevron-left"
        size="22"
        color="#fff"
      ></AtIcon>
      <div className="navTitle">{props.navTitle}</div>
      <div></div>
    </div>
  );
}
