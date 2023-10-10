import { css } from 'lit';

export const globalStyles = css`
    a {
      text-decoration: none;
    }
    a :hover {
      text-decoration: underline;
    }
  `;

export type TStep = { '@type': string, description: string, result: boolean, report?: string };
export type TReview = {
    overview: { title: string, video: string, ok: true | false },
    steps: TStep[]
};

export const reviewsLD: TReview[] = [{
    overview: {
        title: 'Use a bathtub',
        video: 'https://www.youtube.com/watch?v=1Fg5iWmQjwk',
        ok: true

    },
    steps: [{
        '@type': 'HowToStep',
        description: 'fill the bathtub',
        result: true
    },
    {
        '@type': 'HowToStep',
        description: 'get in the bathtub',
        result: true
    },
    {
        '@type': 'HowToStep',
        description: 'wash yourself',
        result: true
    },
    {
        '@type': 'HowToStep',
        description: 'get out of the bathtub',
        result: true
    }
    ]
}, {
    overview: {
        title: 'Eat a plum',
        video: 'https://www.youtube.com/watch?v=1Fg5iWmQjwk',
        ok: false
    },
    steps: [{
        '@type': 'HowToStep',
        description: 'Eat the plum',
        result: true
    },
    {
        '@type': 'HowToStep',
        description: 'Wash your hands',
        result: true
    },
    {
        '@type': 'HowToStep',
        description: 'Dry your hands',
        result: false
    }]
}];
