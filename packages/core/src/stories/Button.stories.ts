import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
  },
};
