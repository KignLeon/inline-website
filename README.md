# Website Base Template

A clean, blank, reusable website template ready for customization.

## Features

- **Modern Design System**: Tailwind CSS + custom design tokens
- **Responsive**: Mobile-first layout with desktop enhancements
- **4 Core Pages**: Home, About, Services, Contact
- **Form Components**: Hero forms, modals, contact forms
- **Animations**: Smooth transitions, scroll reveals, micro-interactions
- **Clean Codebase**: Semantic HTML5, organized CSS, modular JS

## File Structure

```
/
├── index.html              # Homepage
├── about/index.html        # About page
├── services/index.html     # Services page
├── contact/index.html      # Contact page
├── css/style.css           # Custom styles
├── js/script.js            # Interactive functionality
└── assets/placeholders/    # Placeholder images
    ├── logo-placeholder.svg
    ├── hero-placeholder.svg
    ├── team-placeholder.svg
    └── service-placeholder.svg
```

## Customization

### Quick Start

1. Replace "Company Name" with your brand name in all HTML files
2. Update contact information (phone, email, address)
3. Replace placeholder images in `/assets/placeholders/`
4. Customize colors in Tailwind config (look for `colors: { electric: ... }`)
5. Update meta descriptions and titles for SEO

### Form Integration

Forms use `action="#"` by default. To enable submissions:

1. Replace `action="#"` with your form endpoint
2. Options: FormSubmit.co, Formspree, Netlify Forms, custom backend

### Deployment

GitHub Pages compatible. Simply push to your repo and enable Pages.

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## License

MIT - Use freely for any project.
