/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TReview, TStep, globalStyles } from './include.js';

@customElement('reviews-overview')
export class ReviewsOverview extends LitElement {

  @property({ type: Object })
  reviewsLD?: TReview[];

  @property({ type: Number }) selected?: TReview

  static styles = globalStyles;

  render() {
    return this._renderReviews();
  }

  _renderReviews() {
    const reviews = this.reviewsLD?.map((review, index) => html`<li @click=${this._selectReview} @keydown=${this._onKeyDown}><a href=${`/review/${index}`}>${review.overview.title}</a></li>`);
    return html`<ul>${reviews}</ul>`;
  }

  _router() {
    return (globalThis as any).router;
  }
  private _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._selectReview(event);
    }
  }

  async _selectReview(event: Event) {
    const anchor = event.target as HTMLAnchorElement;
    const href = anchor.getAttribute('href');
    if (href) {
      event.preventDefault();
      await this._router().goto(href);
    }
  }
}

@customElement('a-review')
export class AReview extends LitElement {
  @property({ type: Object }) reviewLD?: TReview;

  static styles = css`.review-body {
      display: flex;
    }

    .left-container {
      flex-grow: 1;
    }

    .right-container {
      width: 640px;
    }`;

  render() {
    return this.reviewLD && html`
      <div>
        <h2>${this.reviewLD.overview.title}</h2>
        <div class="review-body">
          <review-step class="left-container" .steps=${this.reviewLD.steps}></review-step>
            <video controls width="640"><source src="path/to/your/video.mp4" type="video/mp4"></video>
        </div>
      </div>
    `;
  }
}

@customElement('review-step')
export class ReviewStep extends LitElement {
  @property({ type: Array }) steps?: TStep[];

  render() {
    return this.steps && html`
        <ul>
        ${this.steps.map(step => this._renderStep(step))}
        </ul>`;
  }

  private _renderStep(step: TStep) {
    return html`<li> ${step.description} ${step.result ? '✓' : '✕'}</li>`
  }

}
