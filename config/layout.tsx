import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import {
  rightContentRender,
  menuItemRender,
  errorComponent as ErrorComponent,
} from '@/utils/layout';

interface LayoutProps extends BasicLayoutProps {
  ErrorComponent: (error: Error) => React.ReactElement<any>;
}

// layout
// - 分类 ( 运行时配置 ) 和 ( 构建时配置 )，这里是运行时配置
// - 运行是配置，具体请查看 config/config.js 文件
// - 在 ( src/app.tsx ) 中引入
export const layout = ({
  // 运行时配置
  initialState,
}: any): LayoutProps => {
  const authLogin = () => {
    const isLoginPath = window.location.pathname === '/login';
    const hasToken =
      initialState?.token ||
      JSON.parse(window.localStorage.getItem('user') || '{}')?.token;

    if (!hasToken && !isLoginPath) {
      console.log(`全局初始state`, initialState);
      window.location.pathname = '/login';
    }
  };

  authLogin();
  return {
    rightContentRender, // 包含了 logout
    menuItemRender,
    ErrorComponent,
    ...initialState?.settings,
    // menuHeaderRender, // 渲染logo和title，这里我们已经指定了title和layout='mix'，所以顶部已经有了和menuHeader类似的组件效果
  };
};
