# UI Mockup

This repository contains HTML mockups for the OmniBazaar user interface. These mockups serve as advance previews for the OmniBazaar development team, providing early visibility into:

- Page content structure and layout
- Visual design and theme implementation
- Typography and font choices
- Image placement and sizing
- User interface workflows and interactions
- Color schemes and branding consistency

The mockups are used for:

- User acceptance testing
- Interface design validation
- Demonstrating application functionality
- Team design reviews and stakeholder previews
- Ensuring consistent look and feel across all modules

## Page Structure

The mockups include the following pages organized by module:

- **index.html** - Main index page with statistics and navigation
- **onboarding-welcome.html** - Initial welcome/landing page
- **auth-login.html** - Login and registration interface
- **wallet-dashboard.html** - User wallet dashboard
- **transaction-send.html** - Send money interface
- **marketplace-home.html** - Main marketplace interface
- **marketplace-categories.html** - Category browsing interface
- **marketplace-search.html** - Search results display
- **marketplace-listing.html** - Individual listing details
- **marketplace-create.html** - Create new marketplace listing

## File Naming Convention

All HTML files follow a consistent naming convention to ensure clarity and organization:

**Pattern:** `{module}-{function}.html`

**Examples:**
- `onboarding-welcome.html` - Onboarding module, welcome function
- `auth-login.html` - Authentication module, login function
- `wallet-dashboard.html` - Wallet module, dashboard function
- `transaction-send.html` - Transaction module, send function
- `marketplace-home.html` - Marketplace module, home function
- `marketplace-categories.html` - Marketplace module, categories function

**Special Cases:**
- `index.html` - Main development portal and navigation hub

## Design Standards

### Theme and Visual Design

All pages must maintain a **consistent, clean, and business-like yet friendly** design that reflects the OmniBazaar brand:

- **Color Scheme:** Primary gradient (purple to blue: #667eea to #764ba2) with white/gray backgrounds
- **Typography:** Inter font family with clear hierarchy (headings, body text, captions)
- **Layout:** Clean, spacious layouts with consistent padding and margins
- **Components:** Unified button styles, form elements, and navigation patterns
- **Imagery:** Professional product photos with consistent aspect ratios

### Design Principles

1. **Consistency:** All pages share the same visual language and component styles
2. **Simplicity:** Clean, uncluttered interfaces that focus on functionality
3. **Intuitiveness:** Familiar patterns that Web2 users can understand immediately
4. **Business-like:** Professional appearance suitable for financial transactions
5. **Friendly:** Approachable design that doesn't intimidate new users
6. **Adaptability:** CSS variables and modular styles for easy design adjustments

### Implementation Requirements

- **HTML Mockups:** Must match the design specifications exactly
- **Vue Components:** Corresponding .vue files must implement identical styling
- **Cross-Platform:** Consistent appearance across OmniBazaar, OmniCoin, CryptoBazaar, and OmniWallet
- **Responsive:** All designs must work on desktop, tablet, and mobile devices
- **Accessibility:** Proper contrast ratios, keyboard navigation, and semantic HTML

### CSS Architecture

To ensure easy design parameter adjustments:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-radius: 8px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

## Assets

- **Globe-*.png** - OmniBazaar logo assets in various sizes
- **Images/** - Product photos, icons, and visual elements

## Usage

Open `index.html` in a web browser to navigate through the mockup interface. All pages are cross-linked for easy navigation and testing of user workflows.

## Development Workflow

### Creating New Mockups

1. **HTML First:** Create HTML mockup following the naming convention
2. **Design Consistency:** Ensure the page matches established design standards
3. **Cross-linking:** Add navigation links to/from related pages
4. **Vue Implementation:** Create corresponding .vue component with identical styling
5. **Index Update:** Add the new page to the index.html navigation
6. **Documentation:** Update this README with the new page description

### Design Updates

1. **Global Changes:** Update CSS variables in the root style definitions
2. **Component Changes:** Modify both HTML mockup and corresponding .vue file
3. **Testing:** Verify changes across all affected pages
4. **Consistency Check:** Ensure the change maintains design harmony

### Quality Assurance

- All pages must render correctly in major browsers
- Design elements must be consistent across all mockups
- Navigation links must work properly
- Content must be professional and error-free
- Responsive behavior must be tested on multiple screen sizes
