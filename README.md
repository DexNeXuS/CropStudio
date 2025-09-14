# CropStudio Website

A professional, responsive website showcasing the CropStudio image processing application. Built with modern HTML5, CSS3, and JavaScript, featuring a premium dark theme that matches the application's design aesthetic.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Premium Dark Theme**: Matches the application's professional color scheme
- **Smooth Animations**: CSS animations and JavaScript interactions for a polished experience
- **Modern UI**: Clean, professional design with gradients, shadows, and sophisticated styling
- **Interactive Elements**: Hover effects, form validation, and smooth scrolling
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## File Structure

```
_WEBSITE/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with premium design
├── script.js           # JavaScript for interactivity
├── assets/
│   └── logo.svg        # Application logo
└── README.md           # This file
```

## Deployment Options

### GitHub Pages (Recommended - Free)

1. **Create a GitHub Repository**:
   - Go to GitHub and create a new repository
   - Name it something like `cropstudio-website` or `cropstudio-site`

2. **Upload Files**:
   - Upload all files from the `_WEBSITE` folder to your repository
   - Make sure `index.html` is in the root directory

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your site will be available at**: `https://yourusername.github.io/repository-name`

### Netlify (Free Tier)

1. **Drag & Drop**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire `_WEBSITE` folder to the deploy area
   - Your site will be live instantly

2. **Custom Domain** (Optional):
   - You can add a custom domain in the Netlify dashboard
   - Perfect for professional branding

### Vercel (Free Tier)

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will automatically deploy your site

## Customization

### Colors
The website uses CSS custom properties (variables) for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --accent: #f59e0b;         /* Accent color */
    --background: #1a1a2e;     /* Background color */
    /* ... other colors */
}
```

### Content
- **Hero Section**: Update the main headline and description in `index.html`
- **Features**: Modify the feature cards to match your application's capabilities
- **Pricing**: Adjust pricing plans and features
- **Contact**: Update contact information and form handling

### Images
Replace the placeholder images with actual screenshots of your application:

1. **Hero Image**: Replace the Unsplash image with a screenshot of your app's main interface
2. **Screenshots**: Add real screenshots showing different features
3. **Logo**: Replace `assets/logo.svg` with your actual logo

### Form Handling
The contact form currently shows a success message. To make it functional:

1. **Netlify Forms**: Add `netlify` attribute to the form
2. **Email Service**: Integrate with services like Formspree or EmailJS
3. **Backend**: Connect to your own backend API

## Performance Optimization

The website is already optimized for performance:

- **Minimal Dependencies**: Only uses Font Awesome for icons
- **Optimized Images**: Uses appropriate image sizes and formats
- **Lazy Loading**: Images load as they come into view
- **Smooth Animations**: Hardware-accelerated CSS animations

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This website template is created for the CropStudio application. Feel free to modify and use for your own projects.

## Support

For questions about the website or deployment, please refer to the main application documentation or contact the development team.

---

**Note**: This is a static website that can be hosted on any web server or CDN. The design is optimized for showcasing software applications and can be easily customized to match your brand.
