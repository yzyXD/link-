# YZY Profile — GitHub Pages

This version is **100% static**. It does not use Node.js, `server.js`, an Admin page, `/api`, or Terminal commands.

## Folder structure

```text
YZY-Profile/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── yzy.gif
    ├── music.mp3
    ├── music.mp3
    └── music.mp3
```

## IMPORTANT: upload the CONTENTS, not the outer folder

Inside your GitHub repository, `index.html` must be directly in the repository root:

```text
YOUR-REPOSITORY/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── yzy.gif
    ├── music.mp3
    ├── music.mp3
    └── music.mp3
```

Do not end up with:

```text
YOUR-REPOSITORY/YZY_Profile_GitHub_Pages_FIXED/index.html
```

## Why the music is split

Your original MP3 is about 106 MB, which is over GitHub's 100 MB limit for one file. It was split into 3 MP3 parts without re-encoding; the website automatically plays part 2 and then part 3, so you still get the full track.

## GitHub Pages

Repository → Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

After publishing, open the GitHub Pages URL.

## If the GIF/music still does not load

Check the repository file names exactly:

- `assets/yzy.gif`
- `assets/music.mp3`
- `assets/music.mp3`
- `assets/music.mp3`

GitHub paths are case-sensitive.
