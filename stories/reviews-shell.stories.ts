import { html, TemplateResult } from 'lit';
import '../src/reviews-shell.js';

export default {
  title: 'ReviewsShell',
  component: 'reviews-shell',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <reviews-shell style="--reviews-shell-background-color: ${backgroundColor}" .header=${header}></reviews-shell>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
