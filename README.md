# CV Generator

A small React app for building a one-page resume. You fill in your details in the editor on the left and watch an A4 preview update live on the right. When you're happy with it, save it as a PDF straight from the browser.

## Features

- **Live A4 preview** that scales with the window and can be zoomed (1x to 2x) and panned by dragging
- **Collapsible editor sections** with an animated expand/collapse: Personal info, Experience, Education, Skills
- **List sections** (Experience, Education): add, edit, delete and drag-to-reorder entries
- **Achievements per entry**: each entry has its own bullet list, with the same add/edit/delete/reorder controls
- **Skills**: separate technical and soft skills lists
- **Fill with example / Clear resume**, both behind a confirmation dialog
- **Save as PDF** via the browser's print dialog, using a dedicated print stylesheet
- **Responsive layout**, with a dropdown menu for the header buttons on narrow screens

## Key challenges

- **Thinking in components**: splitting a UI into small reusable pieces (`Title`, `Input`, `List`, `ListEl`) and deciding what each one is responsible for.
- **Where state should live**: keep it in the closest parent that needs it. Shared data (the CV) lives in `App`, while UI-only state (open/closed, current form) stays in the sections.
- **Controlled inputs**: keeping form values in a state "draft" so the same form works for adding, editing and cancelling.
- **Lifting state up and passing handlers down**: children change parent data by calling functions received as props.
- **Reusable components via props**: passing a `getLabel` function and handlers lets one `List` display experience, education, achievements and skills.
- **Modern CSS**: `em`-based sizing, container query units for scaling, CSS variables, the `grid-template-rows` trick for collapse animations, and `@media print` for the PDF output.
- **Pointer events**: building drag-to-pan with pointer capture and `transform`.

## Tech stack

- React (function components and hooks)
- [`@dnd-kit`](https://dndkit.com/) (`core`, `sortable`, `utilities`) for drag-and-drop reordering
- Plain CSS (custom properties, nested rules, container queries, subgrid)
- Vite-style setup (`main.jsx` entry point)

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the local URL printed in the terminal.

To produce a PDF, click **Save as PDF** and choose "Save as PDF" as the destination in the print dialog. Turn on "Background graphics" if your browser doesn't do it automatically.

## Project structure

```
src/
├── main.jsx               # entry point
├── App.jsx                # all resume state + handlers, header, dialog, layout
├── App.css                # layout, editor styles, dialog, responsive rules
├── index.css              # reset, design tokens (CSS variables)
├── example.js             # sample data for "Fill with example"
├── utils.js               # moveItem (reorder), formatTitle
└── components/
    ├── Footer.jsx         # Footer component with credits
    ├── Input.jsx          # Input and Textarea field components
    ├── Title.jsx          # collapsible section header (icon, h2, arrow)
    ├── ObjectSection.jsx  # single-object section (Personal info)
    ├── ListSection.jsx    # list section + the add/edit Form (Experience, Education)
    ├── SkillsSection.jsx  # Skills section with one editor per skills list
    ├── List.jsx           # sortable list (List) and its rows (ListEl)
    └── Preview.jsx        # A4 preview, zoom buttons, drag-to-pan
```

## License
 
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
 
- [The Odin Project](https://www.theodinproject.com/) for the curriculum and project brief
- Icons from [SVG repo](https://www.svgrepo.com/)

## Author
 
**SleepyCasper** — [GitHub](https://github.com/SleepyCasper)
 
---
Created as a part of [**The Odin Project**](https://www.theodinproject.com/) curriculum

