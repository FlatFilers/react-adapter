import { Flatfile, IEvents, IteratorCallback } from '@flatfile/sdk';
import React, { FC, useCallback } from 'react';

export type FlatfileButtonProps = {
  token: string |  (() => string | Promise<string>);
  mountUrl?: string;
  apiUrl?: string;
  onInit?: (p: IEvents['init']['meta']) => void;
  onData?: IteratorCallback;
  onClose?: () => void;
  onComplete?: (p: IEvents['complete']) => void;
  onError?: (e: Error) => void;
  render?: (payload: { launch: () => void }) => React.ReactElement;
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

const FlatfileButton: FC<FlatfileButtonProps> = ({
  token,
  mountUrl,
  apiUrl,
  onInit,
  onData,
  onComplete,
  onError,
  buttonProps,
  render,
  children,
}) => {
  const handleLaunch = useCallback(() => {
    return Flatfile.requestDataFromUser({
      token,
      ...(mountUrl ? { mountUrl } : {}),
      ...(apiUrl ? { apiUrl } : {}),
      onData,
      onComplete,
      ...(typeof onInit === 'function'
        ? { onInit: ({ meta }) => onInit?.(meta) }
        : {}),
      ...(typeof onError === 'function'
        ? { onError: ({ error }) => onError?.(error) }
        : {}),
    });
  }, [token]);

  return render ? (
    render({ launch: handleLaunch })
  ) : (
    <button {...buttonProps} onClick={() => handleLaunch()}>
      {children}
    </button>
  );
};

export default FlatfileButton;
