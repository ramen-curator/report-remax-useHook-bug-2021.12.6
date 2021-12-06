import React from "react";
import { View } from "remax/wechat";
import { useNativeEffect } from "remax";

const TopContext = React.createContext(undefined);

const doFakeAPI = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        btnList: [
          { id: 1, name: "按钮1" },
          { id: 2, name: "按钮2" },
          { id: 3, name: "按钮3" },
        ],
      };
      resolve(res);
    }, 1000);
  });
};
const usePickContext = (Context, attrName) => {
  const [data, setData] = React.useState();
  const context = React.useContext(Context);

  useNativeEffect(() => {
    if (context) {
      setData(context[attrName]);
    }
  }, [context]);

  return data;
};
const BtnList = () => {
  // 一使用这个方法，就拿不到值
  const btnList = usePickContext(TopContext, "btnList");
  // const btnList = React.useContext(TopContext)?.btnList;
  console.log("从Context中取值", btnList);
  return (
    <View>
      {btnList?.map((b, i) => {
        return <View key={i.toString()}>{b.name}</View>;
      })}
    </View>
  );
};

export default () => {
  const [topData, setTopData] = React.useState();

  // 一开始时，调API，成功后值存到state里。这个state会传给TopContext;
  useNativeEffect(() => {
    doFakeAPI().then((data) => {
      console.log("doFakeAPI 回调值", data);
      setTopData(data);
    });
  }, []);
  return (
    <TopContext.Provider value={topData}>
      <View>
        {/* 按钮列表 */}
        <BtnList />
      </View>
    </TopContext.Provider>
  );
};
