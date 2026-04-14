# Public Assets

This folder contains static assets served by Vite.

## CV Setup

The portfolio expects `/cv.pdf` at runtime. Two options:

### Option 1: Use the Markdown version (quick)
- File: `CV_EVIN_BRIJESH.md`
- Convert to PDF using any of:
  - `pandoc CV_EVIN_BRIJESH.md -o cv.pdf`
  - Online: https://md2pdf.netlify.app/
  - GitHub → Print to PDF
- Place the resulting `cv.pdf` in this folder

### Option 2: Create from a design tool (polished)
- Use Figma, Canva, or Word to design a branded PDF
- Export as `cv.pdf` into this folder

### Option 3: Link to hosted CV (best practice)
- Host your CV on Google Drive or similar
- Update `portfolio.js` contact.cvUrl to the share link
- Users download from the hosted version (always up-to-date)

Once `cv.pdf` exists in `/public/`, the Footer link will work:
```
<a href="/cv.pdf" download>DOWNLOAD_CV</a>
```

## Testing locally
```bash
npm run dev
# Footer → DOWNLOAD_CV should trigger download of cv.pdf
```