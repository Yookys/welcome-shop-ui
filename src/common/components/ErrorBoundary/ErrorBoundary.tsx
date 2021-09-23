import React, {Component, ErrorInfo, ReactNode} from 'react';

import ErrorWrapper from '../ErrorWrapper/ErrorWrapper';

interface ErrorBoundaryProps {
  children: ReactNode;
  errorMessage?: string;
  globalError?: boolean;
  isShowStackTrace?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Компонент-обёртка для обработки ошибок React
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState((prevState) => ({...prevState, error, errorInfo}));
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.globalError) {
        return <ErrorWrapper error={this.state.error} errorInfo={this.state.errorInfo} />;
      }
      return <span>{this.props.errorMessage || 'Произошла неизвестная ошибка...'}</span>;
    }

    return this.props.children;
  }
}
