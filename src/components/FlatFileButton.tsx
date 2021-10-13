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
    const i = flatfileImporter(token);

    if (typeof onInit === 'function') {
      i.on('init', onInit);
    }
    if (typeof onLaunch === 'function') {
      i.on('launch', onLaunch);
    }
    if (typeof onClose === 'function') {
      i.on('close', onClose);
    }
    if (typeof onComplete === 'function') {
      i.on('complete', onComplete);
    }

    return i;
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
