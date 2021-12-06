import React, { useState, useRef, useContext } from "react";
import { View } from "remax/wechat";
import { useNativeEffect } from "remax";

import "./index.css";

const TopContext = React.createContext(undefined);
const SelectedContext = React.createContext(null);

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
    console.log('hahaha',attrName,context)
    if (context) {
      setData(context[attrName]);
    }
  }, [context]);

  return data;
};
const BtnList = () => {
  const btnList = usePickContext(TopContext, 'btnList')
  const selectedContext = useContext(SelectedContext);
  console.log(btnList)
  return (
    <View>
      {btnList?.map((b, i) => {
        return (
          <View
            key={i.toString()}
            onClick={() => {
              selectedContext?.setSelectedId(b.id);
            }}
            style={
              selectedContext?.selectedId === b.id
                ? { backgroundColor: "greenyellow" }
                : {}
            }
          >
            {b.name}
          </View>
        );
      })}
    </View>
  );
};

export default () => {
  const [topData, setTopData] = React.useState();

  // 一开始时，调API，成功后值存到state里。这个state会传给TopContext;
  useNativeEffect(() => {
    doFakeAPI().then((data) => {
      console.log('do!',data)
      setTopData(data);
    });
  }, []);
  const [selectedId, setSelectedId] = useState();
  return (
    <TopContext.Provider value={topData}>
      <SelectedContext.Provider
        value={{
          selectedId,
          setSelectedId,
        }}
      >
        <View>
          {/* 按钮列表 */}
          <BtnList />
          <View>
            {/* 显示选中按钮的id */}
            {selectedId}
          </View>
        </View>
      </SelectedContext.Provider>
    </TopContext.Provider>
  );
};
