# BookNook Design Specification

## Design direction

BookNook is a quiet, editorial book archive rather than a conventional shopping grid. The page should feel like a well-kept library index: generous whitespace, confident typography, restrained color, and browsing tools that invite discovery.

This direction is inspired by the structure and tone of the [Hallmark Grid theme](https://www.usehallmark.com/themes/grid/), especially its archival introduction, alphabetical browsing, year slider, printer/category grouping, and faceted search. It should be an original BookNook interface, not a direct copy of the reference site.

## Page goals

- Make the size and richness of the collection immediately clear.
- Let readers browse without knowing exactly what they want.
- Make filtering by author, publication year, genre, and publisher feel simple.
- Keep book covers and metadata legible at a glance.
- Encourage opening a book record for more detail.

## Page structure

### 1. Header

- Sticky or lightly persistent header on scroll.
- Left: `BookNook` wordmark.
- Right: `Browse`, `Search`, and `About` links.
- Use a thin bottom rule instead of a filled navigation bar.
- On small screens, collapse secondary links into a menu button while keeping the wordmark visible.

### 2. Editorial introduction

Use a full-width, text-led opening section:

- Eyebrow: `THE BOOKNOOK ARCHIVE`
- Headline: `A reading room for curious minds.`
- Supporting copy: explain that readers can explore books by author, year, genre, or publisher.
- Collection statistic: e.g. `1,240 books, one shared shelf`.
- Primary action: `Explore the collection`.

The headline should be the largest element on the page and should occupy no more than two or three lines on desktop.

### 3. Browse by author

- Section heading: `Authors, A to Z`.
- Supporting text: `Start with a name, then follow the shelf.`
- Render the alphabet as a flexible row or wrapped grid of text links.
- Available letters use the accent color; unavailable letters are muted and disabled.
- Selecting a letter updates the collection results and scrolls the reader to the results area.

### 4. Browse by publication year

- Section heading: `Any year, 1900 to today`.
- Use a horizontal range slider with two handles for a publication-year range.
- Show the selected range in large numerals above the slider.
- Include a small result label such as `Books published from 1957`.
- The slider must have a keyboard-accessible label and visible focus state.
- On mobile, allow the slider to scroll horizontally without clipping its labels.

### 5. Browse by genre or publisher

- Section heading: `By the shelf that holds it`.
- Show a responsive list of genres or publishers as large text links.
- Each item includes a count, for example `Literary fiction  ·  184`.
- Hovering or focusing an item reveals a small arrow or underline transition.
- Keep this section text-first; do not turn every item into a heavy card.

### 6. Collection results

- Section heading: `The collection`.
- Show the active filter summary above the grid:
  - `All books`
  - `Clear filters`
  - Count of matching books
- Desktop: four-column cover grid with consistent image ratios.
- Tablet: three columns.
- Mobile: two columns, with enough gap for each cover to remain distinct.
- Every result includes:
  - Cover image
  - Title
  - Author
  - Publication year
  - Optional genre or publisher label
- Use object-fit cover and a subtle border so pale covers remain visible.
- The entire result card is clickable, but the title should remain the clearest text link.
- Add pagination or an explicit `Load more books` action; do not render an unbounded list.

### 7. Search

- Section heading: `Search the whole library`.
- Use one prominent search input with placeholder text: `Search by title, author, genre, or publisher`.
- Add optional filter controls for author, year, genre, and publisher.
- The search form should support filling one, two, or all filters.
- Pressing Enter submits the form.
- Show an explicit empty state when no books match:
  - `Nothing on this shelf yet.`
  - `Try a broader search or clear a filter.`

### 8. Footer

- Repeat the `BookNook` wordmark at left.
- Include a short statement about the archive.
- Include links to `About`, `Contact`, and `Privacy`.
- Use a top rule and generous vertical padding.

## Visual system

### Color palette

Use a warm, paper-like base rather than stark white:

```text
Paper       #F4F0E8
Surface     #FBF9F4
Ink         #1C1B18
Muted ink   #706C63
Rule        #D8D1C5
Accent      #A54832
Accent dark #7E3021
```

- `Paper` is the overall page background.
- `Surface` is used for inputs, result panels, and light contrast areas.
- `Ink` is the primary text color.
- `Muted ink` is for supporting metadata only, never for essential controls.
- `Accent` identifies links, active filters, slider progress, and primary actions.
- Avoid gradients, glassmorphism, drop shadows, and saturated decorative colors.

### Typography

- Display face: a high-contrast serif for the hero, section headings, years, and book titles.
- Utility face: a clean sans-serif for navigation, labels, filters, counts, and helper text.
- Use uppercase sparingly for eyebrow labels and compact metadata.
- Recommended hierarchy:
  - Hero: `clamp(3.5rem, 9vw, 8.5rem)`, tight line-height.
  - Section headings: `clamp(2rem, 4vw, 4.5rem)`.
  - Book titles: `1rem` to `1.15rem`, serif, medium weight.
  - Body copy: `1rem` to `1.125rem`, line-height around `1.5`.
  - Metadata: `0.72rem` to `0.8rem`, uppercase with modest letter spacing.
- Do not use the default Next.js starter styling as the visual identity.

### Spacing and layout

- Use a centered content frame with a maximum width around `1440px`.
- Desktop page gutters: `clamp(1.25rem, 4vw, 5rem)`.
- Section spacing: `clamp(5rem, 12vw, 12rem)`.
- Keep the opening section mostly empty around the headline.
- Use thin rules to separate major archive sections.
- Align section headings and controls to the same content grid.

## Interaction and states

- Link hover: accent-colored underline grows from left to right.
- Link focus: use a visible 2px accent outline with a small offset.
- Buttons and filter controls should have pressed, hover, disabled, and focus states.
- Changing any filter updates the result count and active-filter summary.
- Preserve filter state in the URL query string so results can be shared and revisited.
- Show a loading state that preserves the grid geometry; avoid layout jumps.
- If an image fails, show a neutral paper-colored placeholder with the book title.
- Respect `prefers-reduced-motion` by disabling decorative transitions.

## Responsive behavior

### Desktop (1024px and up)

- Use the full editorial layout and four-column book grid.
- Keep the author alphabet on one or two lines where possible.
- Place search controls in one horizontal row when space allows.

### Tablet (768px–1023px)

- Reduce hero size and section spacing.
- Use a three-column book grid.
- Allow search filters to wrap to a second row.

### Mobile (below 768px)

- Use a two-column book grid.
- Stack search controls vertically.
- Keep the year value visible while the slider is used.
- Allow alphabet links to wrap naturally with generous tap targets.
- Use at least `44px` of height for interactive controls.
- Keep title and author metadata readable; do not hide essential book information behind hover.

## Accessibility requirements

- Use semantic landmarks: `header`, `main`, `nav`, `section`, and `footer`.
- Give each major section a descriptive heading.
- Provide text alternatives for every cover image.
- Do not communicate filter state using color alone.
- Ensure all controls are keyboard reachable and have visible focus.
- Associate labels with every input and slider.
- Maintain readable contrast for body text and muted metadata.
- Announce updated result counts to assistive technology where results update dynamically.

## Content model

Each book result should support:

```ts
type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
  publisher?: string;
  coverUrl: string;
  coverAlt: string;
};
```

## Definition of done

- The page communicates the archive concept before the first result grid.
- A user can browse by author, year, genre, or publisher.
- A user can search using any combination of supported filters.
- Results work at desktop, tablet, and mobile widths without horizontal overflow.
- Keyboard and screen-reader users can operate every browse and search control.
- Empty, loading, disabled, hover, and focus states are intentionally designed.
