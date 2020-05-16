describe('getDynamicText', function() {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders actual value', function() {
    jest.doMock('app/constants', () => ({
      IS_CI: false,
    }));
    const getDynamicText = require('sentry/utils/getDynamicText').default;

    expect(
      getDynamicText({
        fixed: 'Text',
        value: 'Dynamic Content',
      })
    ).toEqual('Dynamic Content');
  });

  it('renders fixed content when `app/constants/IS_CI` is true', function() {
    jest.doMock('app/constants', () => ({
      IS_CI: true,
    }));
    const getDynamicText = require('sentry/utils/getDynamicText').default;

    expect(
      getDynamicText({
        fixed: 'Text',
        value: 'Dynamic Content',
      })
    ).toEqual('Text');
  });
});
