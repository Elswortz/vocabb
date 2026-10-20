type AuthFailureHandler = () => void;

let onAuthFailure: AuthFailureHandler | null = null;

export const authEvents = {
  setHandler: (handler: AuthFailureHandler) => {
    onAuthFailure = handler;
  },

  clearHandler: () => {
    onAuthFailure = null;
  },

  notifyFailure: () => {
    onAuthFailure?.();
  },
};
