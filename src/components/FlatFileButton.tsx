import { flatfileImporter, IEvents } from '@flatfile/sdk';
import React, { FC, useCallback } from 'react';

export type FlatfileButtonProps = {
  token: string;
  mountUrl?: string;
  apiUrl?: string;
  onInit?: (p: IEvents['init']) => void;
  onLaunch?: (p: IEvents['launch']) => void;
  onClose?: () => void;
  onComplete?: (p: IEvents['complete']) => void;
  onError?: (e: Error) => void;
  render?: (launch: () => void) => React.ReactElement;
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
  onLaunch,
  onClose,
  onComplete,
  onError,
  buttonProps,
  render,
  children,
}) => {
  const handleLaunch = useCallback(() => {
    const importer = flatfileImporter(token, {
      ...(mountUrl ? { mountUrl } : {}),
      ...(apiUrl ? { apiUrl } : {}),
    });

    if (typeof onInit === 'function') {
      importer.on('init', onInit);
    }
    if (typeof onLaunch === 'function') {
      importer.on('launch', onLaunch);
    }
    if (typeof onClose === 'function') {
      importer.on('close', onClose);
    }
    if (typeof onComplete === 'function') {
      importer.on('complete', onComplete);
    }

    importer.launch().catch((e: Error) => onError?.(e));
  }, [token]);

  return render ? (
    render(handleLaunch)
  ) : (
    <button {...buttonProps} onClick={() => handleLaunch()}>
      {children}
    </button>
  );
};

export default FlatfileButton;
