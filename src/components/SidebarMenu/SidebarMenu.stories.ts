import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SidebarMenu } from './SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menu: {
      options: ['pokemon', 'type', 'powerCalculator'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pokemon: Story = {
  args: {
    menu: 'pokemon',
  },
};

export const Type: Story = {
  args: {
    menu: 'type',
  },
};

export const powerCalculator: Story = {
  args: {
    menu: 'powerCalculator',
  },
};
