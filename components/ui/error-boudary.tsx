"use client";

import type { ReactNode } from "react";
import { Component } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: Boolean(error) };
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is actually not true
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
