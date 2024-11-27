import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);

  private onChange = (rating: number) => { };
  private onTouched = () => { };

  ngOnInit() {
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, index) => index < this.rating);
  }

  selectRating(rating: number) {
    this.rating = rating;
    this.updateStars();
    this.onChange(this.rating);
    this.onTouched();
  }

  writeValue(rating: number): void {
    this.rating = rating;
    this.updateStars();
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }
}