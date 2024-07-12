import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },

    size: {
      options: ['small', 'medium'],
      control: { type: 'radio' },
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    size: 'medium',
    inline: true,
    label: '검색',
    placeholder: '키워드 입력',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: '검색',
    placeholder: '키워드 입력',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: '검색',
    placeholder: '키워드 입력',
  },
};
