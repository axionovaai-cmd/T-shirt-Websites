---
name: Obsidian & Gilt
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3031'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#c6c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffb86f'
  on-tertiary: '#4a2800'
  tertiary-container: '#000000'
  on-tertiary-container: '#aa6500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86f'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.2em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-xs: 8px
  stack-md: 24px
  stack-xl: 80px
---

## Brand & Style

This design system is engineered for a premium T-shirt brand that sits at the intersection of high-fashion and technical precision. The brand personality is enigmatic, sophisticated, and authoritative. It targets a discerning audience that values quiet luxury, architectural minimalism, and editorial storytelling.

The visual style is a fusion of **Modern Minimalism** and **High-Contrast Editorial**, now pushed into an **Absolute Monochromatic** territory. It leverages expansive dark negative space to make the product the hero, using a double-black foundation (both Primary and Secondary) punctuated by high-visibility safety orange for technical accents and antique gold for brand heritage. The interface feels like a digital boutique—hushed, curated, and shrouded in a premium, "black-out" aesthetic.

## Colors

The palette is rooted in absolute, light-absorbing blacks to create a canvas of infinite depth. By utilizing black for both primary and secondary roles, the system achieves a "stealth" luxury feel where hierarchy is defined by texture, borders, and sparse technical highlights.

*   **Primary (Pure Black):** The "Obsidian" core (#000000). Used for layouts, backgrounds, and primary structural elements to provide a high-contrast base for photography.
*   **Secondary (Deep Obsidian):** Also Pure Black (#000000). This reinforces the monochromatic immersion, used for layered components where depth is achieved via 1px borders rather than color shifts.
*   **Tertiary (Safety Orange):** Use Safety Orange (#FF9900) sparingly for high-visibility technical details, notifications, or "limited edition" indicators. This adds an industrial, avant-garde edge to the luxury aesthetic.
*   **Neutral (Muted Grey):** Metadata and secondary text use Muted Grey (#8B8B8B) to establish hierarchy, leaning into a more clinical, precise feel against the black backdrop.
*   **Accent:** The Antique Gold (#C9A04A) remains the signature mark of quality, reserved for specific highlights and interactive states.

## Typography

The typography system relies on the tension between the classic elegance of **Playfair Display** and the technical clarity of **Inter**.

*   **Display & Headlines:** Always use Playfair Display. For large display sizes, use tight letter spacing to create a high-fashion, editorial lockup.
*   **Body Text:** Use Inter with a light weight (300) for product descriptions to maintain a refined, airy feel.
*   **Signature Labels:** A core brand element is the "Label Caps" style. These are small, uppercase Inter labels with generous tracking (0.2em). Use these for navigation, categories, and overlines.

## Layout & Spacing

This design system utilizes a **Fixed Editorial Grid** for desktop (12 columns) and a fluid 4-column grid for mobile.

*   **Negative Space:** Be aggressive with whitespace (blackspace). Use the `stack-xl` (80px) spacing to separate major content sections, mimicking the layout of a luxury magazine.
*   **Alignment:** Left-align most text to maintain an architectural edge. Use centered alignment only for hero headlines or specific landing page moments.
*   **Dividers:** Use 1px hairline dividers in Muted Grey (#8B8B8B) for subtle structural breaks, or Safety Orange (#FF9900) for highlighting technical specifications.

## Elevation & Depth

In a dual-black palette, depth is achieved through **High-Contrast Layering** and the strategic use of technical accents rather than traditional shadows.

*   **Base Layer:** Pure Black (#000000).
*   **Surface Layer:** Because Primary and Secondary are both Black, surfaces are distinguished by 1px hairlines using Muted Grey (#8B8B8B) or through the use of semi-transparent overlays.
*   **Interactions:** When an element is hovered, its surface should subtly lighten or a 1px Safety Orange or Antique Gold border should fade in.
*   **Backdrop:** For modals or overlays, use a heavy backdrop blur (20px+) over the black background to create a "smoked glass" effect.

## Shapes

The shape language is strictly architectural and precise, emphasizing the "sharp" nature of the brand.

*   **Corner Radius:** UI elements use a 0px radius. This uncompromising sharpness reinforces the high-fashion, bespoke tailoring aesthetic.
*   **Containers:** Product images should always be sharp-cornered (0px) to maintain the editorial aesthetic.

## Components

### Buttons
*   **Primary:** Solid Black with a 1px Muted Grey border and Muted Grey text. 0px corner radius. No shadow.
*   **Secondary:** Ghost style. 1px Muted Grey border, Muted Grey text. On hover, border changes to Safety Orange for a technical flash.
*   **Technical:** Solid Safety Orange with Black text. Used for "Add to Cart" or "Limited Release" to create urgency.

### Inputs
*   **Style:** Minimalist bottom-border only (1px Muted Grey). Background is transparent.
*   **Focus State:** Bottom border transitions to Safety Orange with a subtle fade.
*   **Typography:** User input should be in Inter 16px to prevent iOS zoom.

### Cards
*   **Product Card:** No visible background shift. Defined by the product imagery on a black field. 
*   **Hover State:** The image should perform a "slow scale" (1.05x) over 0.8s when hovered, creating a premium, cinematic feel.

### Lists & Navigation
*   **Nav Links:** Use the `label-caps` typography style. 
*   **Dividers:** Vertical or horizontal 1px lines in Muted Grey (#8B8B8B).

### Chips
*   **Style:** Small, sharp-cornered rectangles with 1px Muted Grey borders. Background is transparent. For "Sale" or "New", use a 1px Safety Orange border.