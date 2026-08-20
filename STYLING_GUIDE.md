# Reading Room Theme - Styling Guide

## Theme Overview
The Library Book Management System now uses a "Reading Room" theme with a distinct library aesthetic featuring warm tones, library-inspired elements, and readable serif fonts.

## CSS Variables (in `index.css`)
```css
--bg-cream: #FAF7F0          /* warm background */
--primary-blue: #1B4965      /* deep library blue */
--accent-blue: #5FA8D3       /* lighter accent blue */
--stamp-green: #2E7D32       /* available stamp color */
--stamp-red: #B3261E         /* checked-out stamp color */
--text-dark: #2B2B2B         /* main text color */
```

## Components Updated with ClassNames

### 1. Navigation (`Navigation.jsx`)
- Uses `.navbar` class for container
- `.navbar-brand` for site title with emoji
- `.navbar-links` flexbox container
- `.nav-link` for each link with `.active` class for current route
- **Feature:** Hover underline animates from left to right using `::after` pseudo-element

### 2. BookCard (`BookCard.jsx`)
- `.book-card` - main container with 8px left border (book spine effect)
- `.book-card-category` - positioned top-right with small-caps
- `.book-card-title` - bold primary-blue title
- `.book-card-author` - italic, muted gray
- `.availability-stamp` - ink stamp effect with monospace font
  - `.available` - green border/text for available books
  - `.checked-out` - red border/text for unavailable books
  - **Feature:** All stamps rotated -3deg for authentic ink stamp look

### 3. HomePage (`HomePage.jsx`)
- `.home-page` - centered container
- `.home-subtitle` - italic accent-blue text

### 4. BooksPage (`BooksPage.jsx`)
- `.books-page` - main container
- `.books-count` - italic metadata text
- `.loading-text` - centered loading message
- `.error-text` - red error display
- `.books-grid` - responsive auto-fill grid layout (min 300px cards)

### 5. BorrowPage (`BorrowPage.jsx`)
- `.borrow-page` - main container
- `.checkout-form` - centered form with dashed border (like old checkout slip)
- `.form-group` - label + input wrapper
- `.stamp-button` - "STAMP & BORROW" button with primary-blue background
- `.borrowing-preview` - live preview text with accent-blue background

### 6. App (`App.jsx`)
- `.app-container` - flexbox column for full-height layout
- `.page-content` - main content area with max-width and padding

## Key Styling Features Explained

### Book Spine Effect
```css
border-left: 8px solid var(--accent-blue);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
```
- Thick left border mimics book spine on a shelf
- Soft shadow creates depth like books lying down

### Ink Stamp Stamps
```css
font-family: 'Courier New', monospace;
transform: rotate(-3deg);
border: 2px solid;
```
- Monospace font makes it look mechanical/stamped
- Rotation gives authentic tilted stamp appearance
- Thin 2px border with matching text color

### Navbar Link Animation
```css
.nav-link::after {
  width: 0;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
```
- Uses pseudo-element for underline that slides in from left
- Active route keeps underline permanently
- Simple CSS transition, no JavaScript

### Checkout Form Slip
```css
border: 2px dashed var(--primary-blue);
font-family: 'Courier New', monospace;
font-variant: small-caps;
```
- Dashed border looks like old paper form
- Monospace inputs like typewriter entries
- Small-caps labels mimic printed forms

## All CSS Properties Used (for Viva)
- `display`, `flex`, `grid`, `flex-direction`, `justify-content`, `gap`
- `background-color`, `color`, `border`, `border-left`, `box-shadow`
- `padding`, `margin`, `max-width`, `width`, `min-height`
- `font-family`, `font-size`, `font-weight`, `font-style`, `font-variant`
- `letter-spacing`, `line-height`, `text-align`
- `transform: rotate()`, `translate()`
- `transition`, `outline`, `cursor`
- CSS variables with `var()`
- Pseudo-elements `::after`
- Pseudo-classes `:hover`, `:active`, `:focus`
- Media queries implicit in grid `auto-fill`

## No Advanced Patterns Used
✓ Plain CSS only (no CSS-in-JS, no styled-components, no Tailwind)
✓ Single `index.css` file
✓ CSS variables for color palette
✓ Basic selectors and properties
✓ Simple transitions and transforms
✓ No SASS/SCSS preprocessing
✓ No utility classes
✓ Semantic class naming

## Testing the Theme
1. Start frontend: `npm run dev`
2. Visit all pages to see:
   - Navbar with hover animations and active state
   - Book cards on /books with spine borders and stamp badges
   - Checkout slip form on /borrow with monospace inputs
   - Consistent color palette throughout
