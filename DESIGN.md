# Design Brief

## Direction

**Precision Capture** — Dark editorial scanning interface focused on document capture clarity and efficient image manipulation workflows.

## Tone

Professional minimalism with technical precision; dark mode reduces eye strain during camera interaction and emphasizes document preview clarity.

## Differentiation

Teal-blue primary (scan metaphor) paired with warm amber accents creates visual urgency and distinction between capture and enhancement workflows.

## Color Palette

| Token           | OKLCH         | Role                                    |
|-----------------|---------------|------------------------------------------|
| background      | 0.145 0.014 240 | Deep charcoal canvas for document focus |
| foreground      | 0.95 0.01 240  | High-contrast text on dark              |
| card            | 0.18 0.014 240 | Elevated content surfaces               |
| primary         | 0.6 0.18 200   | Teal-blue for capture & confirm actions |
| accent          | 0.72 0.17 70   | Warm amber for secondary & highlights   |
| destructive     | 0.55 0.2 25    | Red for delete/cancel                   |
| border          | 0.28 0.02 240 | Subtle dividers & control panel edges   |
| muted           | 0.22 0.02 240 | Background for alternating list rows    |

## Typography

- **Display**: Space Grotesk — geometric, tech-forward heading hierarchy for document titles and section labels
- **Body**: DM Sans — clean, legible body text for controls, lists, and metadata
- **Mono**: JetBrains Mono — OCR text display and technical metadata
- **Scale**: h1 `text-4xl font-bold tracking-tight`, section labels `text-sm uppercase font-semibold`, body `text-base`

## Elevation & Depth

Subtle card-based hierarchy with minimal shadows; edge detection visualization uses low-opacity teal overlays on video canvas; control panels sit as semi-transparent fixed overlays on preview area.

## Structural Zones

| Zone       | Background          | Border              | Notes                                          |
|------------|---------------------|---------------------|------------------------------------------------|
| Header    | card (0.18 0.014 240) | border-bottom       | Doc title, breadcrumb navigation, upload btn   |
| Content   | background (0.145)    | —                   | Full-height camera preview or image view       |
| Sidebar   | card with opacity     | border-l            | Adjustment sliders, filter toggles (overlay)  |
| Footer    | muted (0.22 0.02 240) | border-t            | Document library grid, pagination            |

## Spacing & Rhythm

Spacious padding for readability (24px sections, 16px intra-group); tight control panel dense packing (8px input gaps); alternating row backgrounds in document list for scanability.

## Component Patterns

- **Buttons**: Primary (teal bg, black text), Secondary (amber bg, black text), Destructive (red bg), Tertiary (transparent, border)
- **Cards**: 6px rounded corners, subtle box-shadow-scan on elevation
- **Controls**: Vertical slider stacks, toggle switches with accent underline on active state
- **Lists**: Alternating row backgrounds (muted), hover highlights with primary color

## Motion

- **Entrance**: Subtle fade-in for modals and sidebars (0.2s), staggered for list items
- **Hover**: Smooth color transition (0.2s) on buttons and list rows, scale slight (0.98)
- **Decorative**: Edge-detect animation on camera canvas (2s pulse), pulsing document loading state

## Constraints

- No gradients or decorative overlays; maintain clarity for document preview
- All UI elements use only defined OKLCH tokens; no arbitrary colors
- Minimal rounded corners (6px max) maintain professional appearance; avoid rounded pill buttons
- Shadows only on elevated cards; canvas preview is flat

## Signature Detail

Teal-blue animated edge-detection overlay on camera preview provides visual confirmation of document frame detection without obstructing content.

