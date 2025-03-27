import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  template: `<span class="badge bg-secondary">
    {{ value() }}
    @for (_ of starsArray(); track $index) {⭐️}
  </span>`,
})
export class RatingComponent {
  readonly value = input.required<number>();
  readonly starsArray = computed(() => new Array(Math.max(this.value(), 1)))
}
