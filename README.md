# Scaffolding Human-AI Collaboration

Companion website for the research paper:

**"Scaffolding Human-AI Collaboration: A Field Experiment on Behavioral Protocols and Cognitive Reframing"**

Alex Farach, Alexia Cambon, Lev Tankelevitch, Connie Hsueh, Rebecca Janssen — Microsoft Corporation (2026)

## About the study

A field experiment with 388 employees at Gap Inc. testing two interventions for human-AI collaboration:

- **Behavioral scaffolding** (Task A, pair-level): A structured "Create-Out-Loud" protocol requiring joint AI use
- **Cognitive scaffolding** (Task B, individual-level): Partnership training reframing AI as a thought partner

Both conditions had full access to Microsoft Copilot. The study tests *how* people use AI, not whether they have it.

## About this site

An interactive presentation of the study's findings, built with React, TypeScript, Vite, and Tailwind CSS. All statistics and data visualizations reflect the final paper.

## Development

```bash
npm install
npm run dev
```

## Deployment

The site deploys to GitHub Pages automatically on push to `main` via the workflow in `.github/workflows/deploy.yml`.

Live site: https://microsoft.github.io/ai-mindset-experiment/
