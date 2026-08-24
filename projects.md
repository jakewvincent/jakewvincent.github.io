---
title: Work
layout: default
nav: work
updated: 2026-08-22
description: "Agent systems and open-source work: full-agent telephony, mobile Hermes chat, mkdnflow.nvim, and Discourse Simulator, plus evaluation and language research."
main-img: assets/images/boxelder_borderless.png
main-img-wide: assets/images/boxelder_wide.webp
main-img-alt: Peel-apart Polaroid of a box elder tree against pale sky.
---

<section class="artifact-index" aria-labelledby="featured-work">
    <div class="section-heading-row">
        <h2 id="featured-work">Agent systems</h2>
    </div>

    <article class="artifact-row">
        <p class="artifact-number" aria-hidden="true">01</p>
        <div class="artifact-copy">
            <p class="artifact-type">Live personal deployment · current</p>
            <h3>Full-agent telephony for Hermes</h3>
            <p>A live telephone interface to my full Hermes agent. LiveKit/SIP carries calls into persistent Hermes sessions with memory, tools, and project context intact. The engineering focus is the seam between real-time audio and durable agent state: fail-closed authorization and routing, barge-in, and reconciling persisted history so it reflects only speech that was actually delivered. The source remains private.</p>
        </div>
        <p class="artifact-action">Case study planned</p>
    </article>

    <article class="artifact-row">
        <p class="artifact-number" aria-hidden="true">02</p>
        <div class="artifact-copy">
            <p class="artifact-type">Deployed personal prototype · current</p>
            <h3>Touch-first mobile chat for Hermes</h3>
            <p>A working, touch-first mobile client for canonical Hermes sessions. It preserves Hermes's backend-owned session and tool semantics while adapting streaming output, live and historical tool state, approvals, diffs, and recovery to small screens. I documented the product and architecture case in a public RFC.</p>
        </div>
        <p class="artifact-action"><a href="https://github.com/NousResearch/hermes-agent/issues/89661">Architecture RFC ↗</a></p>
    </article>

    <article class="artifact-row">
        <p class="artifact-number" aria-hidden="true">03</p>
        <div class="artifact-copy">
            <p class="artifact-type">Open-source maintenance · 2021–current</p>
            <h3>mkdnflow.nvim</h3>
            <p>Creator and maintainer of a Neovim plugin for navigating and managing markdown-based repositories—notebooks, wikis, and knowledge bases. Five years of maintenance since 2021, including issue triage, community pull-request review, and backward-compatible releases across breaking upstream changes. The repository has 800+ GitHub stars.</p>
        </div>
        <p class="artifact-action"><a href="https://github.com/jakewvincent/mkdnflow.nvim">View on GitHub ↗</a></p>
    </article>

    <article class="artifact-row">
        <p class="artifact-number" aria-hidden="true">04</p>
        <div class="artifact-copy">
            <p class="artifact-type">Agent system &amp; working paper · current</p>
            <h3><a href="/discourse-sim.html">Discourse Simulator for Task-Oriented Dialogue</a></h3>
            <p>A formal conversation simulator connecting private BDI states to shared discourse structures. The white paper documents the architecture, operational semantics, and worked examples.</p>
        </div>
        <p class="artifact-action"><a href="/discourse-sim.html">Read the paper →</a></p>
    </article>
</section>


<section class="home-context" aria-labelledby="supporting-work">
    <h2 id="supporting-work">Supporting work</h2>
    <div>
        <p><strong><a href="https://arxiv.org/abs/2502.08514">Evaluability taxonomy for summary faithfulness</a></strong> — a multi-author study for which I designed a taxonomy of ambiguity, vagueness, and other conditions that make factuality judgments ill-posed. I improved annotation quality through data analysis, annotator interviews, revised guidelines, and a Socratic review tool.</p>
        <p><strong><a href="https://arxiv.org/abs/2510.01659">MDSEval</a></strong> — a meta-evaluation benchmark testing whether automatic methods agree with human assessment of multimodal dialogue summaries.</p>
        <p><strong><a href="https://github.com/jakewvincent/therapy-docs-demo">Therapy Docs</a></strong> — a tablet-optimized prototype for psychotherapy documentation, built around a practicing therapist's workflow: stylus input, streaming narrative generation, structured notes, and a mock/real API architecture. It was not launched as a product. <a href="https://therapydocs.demos.jwv.dev">Demo ↗</a></p>
        <p><strong><a href="https://github.com/jakewvincent/tinyscribe">TinyScribe</a></strong> — browser-based transcription and speaker diarization running entirely client-side on small models (Whisper Tiny, WavLM). <a href="https://tinyscribe.demos.jwv.dev">Demo ↗</a></p>
        <p><strong><a href="https://github.com/jakewvincent/icon-thesaurus">Icon Thesaurus</a></strong> — compare semantically equivalent icons across 10 icon libraries; SVG sprite export. <a href="https://iconthesaurus.demos.jwv.dev">Demo ↗</a></p>
        <p><strong><a href="https://github.com/jakewvincent/texmagic.nvim">TeXmagic</a></strong> — Neovim plugin selecting LaTeX build engines via magic comments (2021).</p>
        <p><strong>Linguistics research</strong> — experimental syntax (relative-clause extraction in English), Chamorro syntax and phonology, and research tooling. See the <a href="/cv.html">CV</a>, the <a href="/dissertation.html">dissertation page</a>, and <a href="/notebooks.html">analysis notebooks</a>.</p>
    </div>
</section>
