import type { Story, Meta } from '@storybook/vue3'
import Counter from "./Counter.vue";
import { within, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: "Counter",
  component: Counter,
  argTypes: {}
} as Meta;

const Template: Story = (args) => ({
  components: { Counter },
  setup() {
    return { args }
  },
  template: "<Counter />",
});

export const Default = Template.bind({});
Default.args = {}

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText('Count: 0')).toBeInTheDocument()

  await fireEvent.click(canvas.getByText('Increment'));
  await fireEvent.click(canvas.getByText('Increment'));

  expect(canvas.getByText('Count: 2')).toBeInTheDocument()

  await fireEvent.click(canvas.getByText('Reset'));

  expect(canvas.getByText('Count: 0')).toBeInTheDocument()
}