import { expect, test as base } from '@playwright/test';

type FixtureOptions = {
  data: { foo: string, bar: string }[];
};

const testFixture = base.extend<FixtureOptions>({
  data: [[], { option: false }],
  page: async ({ page, data }, use) => {
    if (!data || !data.length) {
      // data: { "foo": "foo", "bar": "bar" } somehow...
      throw new Error(':(');
    }

    await use(page);
  }
});

testFixture.describe('POC', () => {
  testFixture.use({
    data: [
      { foo: 'foo', bar: 'bar'},
      { foo: 'bar', bar: 'foo'}
    ]
  });

  testFixture('Should pass', async ({ page }) => {
    expect(true).toBeTruthy();
  });
});
