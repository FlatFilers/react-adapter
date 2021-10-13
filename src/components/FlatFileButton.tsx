import { flatfileImporter, IEvents, IFlatfileImporter } from '@flatfile/sdk';
import React, { FC, useMemo } from 'react';

export type FlatfileButtonProps = {
  token: string;
  onInit?: (p: IEvents['init']) => void;
  onLaunch?: (p: IEvents['launch']) => void;
  onClose?: () => void;
  onComplete?: (p: IEvents['complete']) => void;
  onError?: (e: Error) => void;
  render?: (importer: IFlatfileImporter) => React.ReactElement;
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

const FlatfileButton: FC<FlatfileButtonProps> = ({
  token,
  onInit,
  onLaunch,
  onClose,
  onComplete,
  onError,
  buttonProps,
  render,
  children,
}) => {
  const importer = useMemo(() => {
    const _importer = flatfileImporter(token);

    if (typeof onInit === 'function') {
      _importer.on('init', onInit);
    }
    if (typeof onLaunch === 'function') {
      _importer.on('launch', onLaunch);
    }
    if (typeof onClose === 'function') {
      _importer.on('close', onClose);
    }
    if (typeof onComplete === 'function') {
      _importer.on('complete', onComplete);
    }

    return _importer;
  }, [token]);

  return render ? (
    render(importer)
  ) : (
    <button
      {...buttonProps}
      onClick={() => importer.launch().catch((e: Error) => onError?.(e))}
    >
      {children}
    </button>
  );
};

export default FlatfileButton;
