# Avinash Samsani Portfolio

Personal portfolio for Avinash Samsani, focused on data science, data engineering, AI engineering, analytics, applied research, and SDLC delivery.

## Live Site

When deployed through GitHub Pages, this site will be available at:

https://Avinashsamsani.github.io

## Structure

- `index.html` - portfolio content
- `styles.css` - visual system and responsive layout
- `script.js` - smooth reveal behavior and animated data network


## PayPulse featured project

PayPulse is the first featured project, with a real screenshot from the public
application and a Live Demo link. It covers six months of fictional payment history
and separate frozen-model research labs; predictions are not financial decisions.
The source link is omitted because anonymous access did not verify a public repo.

No bundler, dependency installation, build command, lint configuration or test suite
is required by this static site. Preview locally from the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/#projects. Stop the server with Ctrl+C. Review keyboard
focus, image loading and layouts at 320, 390, 768 and 1440px. Screenshot provenance,
validation evidence and approval steps are in [the feature review](docs/paypulse-feature-review.md).
No automatic publishing or hosting configuration was added.

Verified publishing source: GitHub Pages builds from `main` at `/`. Pushing a feature
branch does not publish it; merging into main requires separate owner approval.
