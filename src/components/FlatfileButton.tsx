import { DataRequestConfig, Flatfile } from '@flatfile/sdk';
import React, { FC, useCallback } from 'react';

export type FlatfileButtonProps = DataRequestConfig & {
  render?: (payload: { launch: () => void }) => React.ReactElement;
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

const FlatfileButton: FC<FlatfileButtonProps> = ({
  open,
  theme,
  token,
  mountUrl,
  apiUrl,
  autoContinue,
  customFields,
  chunkSize,
  mountOn,
  embedId,
  org,
  user,
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
      open,
      theme,
      token,
      embedId,
      org,
      user,
      mountUrl,
      apiUrl,
      autoContinue,
      customFields,
      chunkSize,
      mountOn,
      onInit,
      onData,
      onComplete,
      onError,
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
