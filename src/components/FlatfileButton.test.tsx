/**
 * @jest-environment jsdom
 */
import FlatfileImporter from '@flatfile/adapter';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import FlatfileButton from './FlatFileButton';

jest.mock('@flatfile/adapter');

type Props = typeof FlatfileButton extends React.ComponentType<infer P>
  ? P
  : never;

describe('<FlatfileButton settings={testSettings} />', () => {
  afterEach(cleanup);

  const props: Props = {
    customer: { userId: '12345' },
    licenseKey: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
    settings: {
      type: 'test import',
      fields: [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
      ],
    },
  };

  beforeEach(() => {
    ((FlatfileImporter as unknown) as jest.Mock<FlatfileImporter>).mockClear();
  });

  it('renders button', () => {
    render(<FlatfileButton {...props} />);

    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(FlatfileImporter).toHaveBeenCalledWith(
      props.licenseKey,
      props.settings,
      props.customer
    );
  });

  it('calls requestDataFromUser when button is clicked', async () => {
    render(
      <FlatfileButton {...props} source='mock-source'>
        Click
      </FlatfileButton>
    );

    const instance = ((FlatfileImporter as unknown) as jest.Mock<
      FlatfileImporter
    >).mock.instances[0] as FlatfileImporter;

    const requestDataFromUser = jest.fn(
      // The type here doesn't matter for FlatfileButton as long as a promise is resolved
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (): Promise<any> => Promise.resolve({})
    );
    instance.requestDataFromUser = requestDataFromUser;
    fireEvent.click(screen.getByText('Click'));
    expect(requestDataFromUser).toHaveBeenCalledWith({ source: 'mock-source' });
  });
});
