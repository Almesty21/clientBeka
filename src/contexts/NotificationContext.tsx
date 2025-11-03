// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { notification } from 'antd';

interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const showSuccess = (message: string) => {
    api.success({
      message: 'Success',
      description: message,
      placement: 'topRight',
    });
  };

  const showError = (message: string) => {
    api.error({
      message: 'Error',
      description: message,
      placement: 'topRight',
    });
  };

  const showWarning = (message: string) => {
    api.warning({
      message: 'Warning',
      description: message,
      placement: 'topRight',
    });
  };

  const showInfo = (message: string) => {
    api.info({
      message: 'Info',
      description: message,
      placement: 'topRight',
    });
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};