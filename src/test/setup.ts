import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, expect, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Extend Vitest's expect with jest-dom matchers
expect.extend({
  // Add custom matchers if needed
});

// Mock environment variables for tests
process.env.NODE_ENV = 'test';

// Mock Astro components and utilities for testing
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
}));

// Global test utilities
declare global {
  var testUtils: {
    createMockComponent: (name: string) => React.ComponentType<any>;
  };
}

globalThis.testUtils = {
  createMockComponent: (name: string) => {
    return ({ children, ...props }: any) => {
      return React.createElement(
        'div',
        {
          'data-testid': name,
          ...props,
        },
        children
      );
    };
  },
};
