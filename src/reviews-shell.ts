import { Router } from '@lit-labs/router';
import { LitElement, html, } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './components.js';
import { TReview, reviewsLD, globalStyles } from './include.js';

// use hashLinks (client routing only)
const useHashlinks = true;

@customElement('reviews-shell')
export class ReviewsShell extends LitElement {
  private _router = new Router(this, [
    { path: '/', render: () => html`<reviews-overview .reviewsLD=${this.reviewsLD} />` },
    { path: '/review', render: () => html`<a-review .reviewsLD=${this.reviewsLD} />` },
    { path: '/review/:id', render: ({ id }) => html`<a-review .reviewLD=${this.reviewsLD![parseInt(id!, 10)]} />` }
  ]);
  @property({ type: Object }) reviewsLD?: TReview[];

  @property({ type: String }) header = 'Reviews';

  static styles = globalStyles;

  connectedCallback(): void {
    (globalThis as any).router = useHashlinks ? {
      goto: async (link: string) => {
        window.location.hash = link;
        await this._router.goto(link);
      },
      link: (link: string) => this._router.link(link.replace(/^\//, '#')),
    } : this._router;
    super.connectedCallback();
    this._fetchReviews();
    this.handleInitialHashNavigation();
  }

  router() {
    return (window as any).router;
  }

  private handleInitialHashNavigation() {
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      (window as any).router.goto(initialHash);
    }
  }

  _fetchReviews() {
    this.reviewsLD = reviewsLD;
  }

  render() {
    if (this.reviewsLD === undefined) {
      return html`<h1>Loading reviews</h1>`;
    }
    return html`
        <h1 @click=${this._home} @keydown=${this._home}>⌂<a href=${this._router.link('/')}>${this.header}</a></h1>
        <main>${this._router.outlet()}</main>
    `;
  }

  async _home(event: Event) {
    const anchor = event.target as HTMLAnchorElement;
    const href = anchor.getAttribute('href');
    if (href) {
      event.preventDefault();
      await this.router().goto(href);
    }
  }
}
