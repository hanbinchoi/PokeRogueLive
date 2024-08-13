import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Pokemon } from './Pokemon';

const meta: Meta<typeof Pokemon> = {
  title: 'Components/Pokemon',
  component: Pokemon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },

    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof Pokemon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Pokemon',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Pokemon',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Pokemon',
  },
};
export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Pokemon',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Pokemon',
  },
};
