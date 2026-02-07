---
title: Research & Projects
updated: 2026-02-02
layout: default
---

### Software projects

<div class="card-grid">
    <div class="project-card">
        <h4 class="card-title"><i class="fa-solid fa-comments"></i> Discourse Simulator for Task-Oriented Dialogue</h4>
        <p class="card-description">A conversation simulation system grounded in formal discourse theory. Agents with private mental states (beliefs, desires, intentions) interact through discourse operations on shared information structures including Common Ground, the Table, Discourse Commitments, and To-Do Lists. Integrates Farkas &amp; Bruce (2010), Portner (2007), and the BDI model to generate multi-participant dialogues driven by formal pragmatic principles.</p>
        <div class="card-meta">
            <span class="card-tag">Python</span>
            <span class="card-tag">Discourse</span>
            <span class="card-tag">Pragmatics</span>
            <span class="card-tag">BDI</span>
        </div>
        <div class="card-links">
            <a class="rg-button a-button" href="discourse-sim.html"><i class="fa-solid fa-book-open"></i>&nbsp;&nbsp;Architecture</a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title"><i class="fa-solid fa-hand-holding-heart"></i> Therapy Docs</h4>
        <p class="card-description">A tablet-optimized clinical documentation system for mental health professionals, designed for use during therapy sessions with stylus input. Features include AI-powered narrative generation via streaming, structured progress notes with intervention tracking, intake assessments, treatment planning, diagnosis management, and a mock/real API architecture that enables full functionality without backend infrastructure.</p>
        <div class="card-meta">
            <span class="card-tag">JavaScript</span>
            <span class="card-tag">Alpine.js</span>
            <span class="card-tag">Healthcare</span>
            <span class="card-tag">AI</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/therapy-docs-demo"><i class="fa-brands fa-github"></i>&nbsp;&nbsp;View on GitHub</a>
            <a class="demo-button a-button" href="https://therapydocs.demos.jwv.dev"><i class="fa-solid fa-arrow-up-right-from-square"></i>&nbsp;&nbsp;View Demo</a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title"><i class="fa-solid fa-ear-listen"></i> TinyScribe</h4>
        <p class="card-description">A browser-based speech transcription and speaker diarization tool in which all processing runs client-side using small ML models (Whisper Tiny, WavLM). Features real-time transcription, speaker identification via voice embeddings, optional speaker enrollment for persistent identification, and debug views exposing similarity scores and clustering decisions. Built for personal exploration of how ASR and diarization systems work under the hood, and designed to be modular for use in other projects.</p>
        <div class="card-meta">
            <span class="card-tag">JavaScript</span>
            <span class="card-tag">WebAssembly</span>
            <span class="card-tag">ML</span>
            <span class="card-tag">Speech</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/tinyscribe">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View on GitHub
            </a>
            <a class="demo-button a-button" href="https://tinyscribe.demos.jwv.dev">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                &nbsp;&nbsp;View Demo
            </a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title"><i class="fa-solid fa-image"></i> Icon Thesaurus</h4>
        <p class="card-description">A semantic icon vocabulary builder for comparing icons across 10 popular libraries (Lucide, Heroicons, Feather, Phosphor, Tabler, Bootstrap, Font Awesome, Material Design, Remix, Ionicons). Define abstract meanings like "home" or "settings," then find and compare equivalent icons from each library, like a thesaurus for visual symbols. Features hierarchical organization, multi-variant selection, drag-and-drop reordering, and SVG sprite sheet export with semantic IDs.</p>
        <div class="card-meta">
            <span class="card-tag">JavaScript</span>
            <span class="card-tag">Alpine.js</span>
            <span class="card-tag">Design</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/icon-thesaurus">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View on GitHub
            </a>
            <a class="demo-button a-button" href="https://iconthesaurus.demos.jwv.dev">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                &nbsp;&nbsp;View Demo
            </a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title"><i class="fa-brands fa-markdown"></i> Mkdnflow</h4>
        <p class="card-description">A Neovim plugin for fluent navigation and management of markdown-based document repositories—notebooks, wikis, knowledge bases, or static site content. Features include link-following, backward/forward navigation, automatic directory creation, table formatting, list support, section folding, and more.</p>
        <div class="card-meta">
            <span class="card-tag">Lua</span>
            <span class="card-tag">Neovim</span>
            <span class="card-tag">Markdown</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/mkdnflow.nvim">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View on GitHub
            </a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title"><i class="fa-solid fa-align-justify"></i> TeXmagic</h4>
        <p class="card-description">A simple Neovim plugin enabling <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> build engine selection via magic comments (e.g. <code>%! TEX program = xelatex</code>). Designed for use with the TexLab LSP server's build service.</p>
        <div class="card-meta">
            <span class="card-tag">Lua</span>
            <span class="card-tag">Neovim</span>
            <span class="card-tag">LaTeX</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/texmagic.nvim">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View on GitHub
            </a>
        </div>
    </div>
</div>

### Research

<div class="card-grid">
    <div class="project-card">
    <h4 class="card-title">Extraction from relative clauses in English</h4>
    <p class="card-description">Investigation of whether English selectively tolerates RC subextraction, as documented in Mainland Scandinavian languages, Romance languages, and Hebrew (see <a href="http://www.jstor.org/stable/4178357">Chung & McCloskey 1983</a>, <a href="https://books.google.com/books?hl=en&lr=&id=DUAIAQAAQBAJ&oi=fnd&pg=PA239&dq=kush+microvariation+in+islands&ots=0ABychxQnB&sig=pgZvVqUa2JsscxB_D05KuZ9fSt8#v=onepage&q=kush%20microvariation%20in%20islands&f=false">Kush et al. 2013</a>, <a href="https://muse.jhu.edu/article/690046/pdf?casa_token=wBovu7pEZL4AAAAA:LnyFnb7FGW7T2e9nR6rx_UTE_-qQAHXBSaYbTjXJtR2KEVyCYlXZ7JrQEPMfIEuxqKNf9Otung">Sichel 2018</a>). Findings show English RCs are substantially more transparent to extraction in existentials and predicate nominals.</p>
    <div class="card-meta">
        <span class="card-tag">Syntax</span>
        <span class="card-tag">Experimental</span>
        <span class="card-tag">English</span>
    </div>
    <div class="card-links">
        <a class="download-pdf a-button" href="https://www.proquest.com/openview/760063f3ff8277bc8b1a19ca3f701e6e/"><i class="fa-solid fa-file"></i>&nbsp;&nbsp;Dissertation</a>
        <a class="download-pdf a-button" href="assets/documents/jwv_rc_subext_eng.pdf"><i class="fa-solid fa-file"></i>&nbsp;&nbsp;Writeup</a>
        <a class="r-notebook a-button" href="notebooks.html"><i class="fa-brands fa-r-project"></i>&nbsp;&nbsp;Notebooks</a>
        <a class="download-pdf a-button" href="https://doi.org/10.3390/languages7020117"><i class="fa-solid fa-file"></i>&nbsp;&nbsp;<em>Languages</em> manuscript</a>
    </div>
    </div>
    <div class="project-card">
        <h4 class="card-title">Internally headed relative clauses in Chamorro</h4>
        <p class="card-description">Analysis of Chamorro's typologically rare construction where a noun phrase surfaces within its modifying relative clause. My MA thesis argues the head NP is merged within the RC as a DP headed by a null operator, explaining island sensitivity, linker placement, and interpretive effects. Cited in <a href="https://books.google.com/books?hl=en&lr=&id=cxH9DwAAQBAJ&oi=fnd&pg=PR9&dq=cinque+syntax+of+relative+clauses&ots=LoK2L7ZQQG&sig=RDRX0sev2y1eqiYBkhT7jgJyuLg">Cinque (2020)</a>.</p>
        <div class="card-meta">
            <span class="card-tag">Syntax</span>
            <span class="card-tag">Chamorro</span>
        </div>
        <div class="card-links">
            <a class="download-pdf a-button" href="https://cloudfront.escholarship.org/dist/prd/content/qt0jq7096r/qt0jq7096r.pdf?t=p3qtng">
                <i class="fa-solid fa-file"></i>
                &nbsp;&nbsp;Master's thesis
            </a>
        </div>
    </div>
        <div class="project-card">
        <h4 class="card-title">Syllable parser</h4>
        <p class="card-description">A syllable parser that takes IPA input and produces syllabified output. Includes integration with the <a href="http://www.speech.cs.cmu.edu/cgi-bin/cmudict">CMU Pronouncing Dictionary</a> (100k+ words), with ARPABET-to-IPA conversion for statistical analysis of English pronunciations.</p>
        <div class="card-meta">
            <span class="card-tag">Phonology</span>
            <span class="card-tag">R</span>
            <span class="card-tag">English</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/R-syllable-parser">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View source
            </a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title">HTML interlinear gloss generator</h4>
        <p class="card-description">A tool that converts word, gloss, and free translation data into HTML for displaying interlinear glosses—the standard format for presenting linguistic examples with word-by-word translations—on websites.</p>
        <div class="card-meta">
            <span class="card-tag">JavaScript</span>
            <span class="card-tag">Linguistics</span>
        </div>
        <div class="card-links">
            <a class="github-button a-button" href="https://github.com/jakewvincent/HTML-interlinear-gloss">
                <i class="fa-brands fa-github"></i>
                &nbsp;&nbsp;View source
            </a>
            <a class="demo-button a-button" href="gloss-generator.html">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                &nbsp;&nbsp;Try it
            </a>
        </div>
    </div>
    <div class="project-card">
        <h4 class="card-title">Rhyme in Chamorro poetry</h4>
        <p class="card-description">Analysis of 106 rhyme pairs from Joaquin F. Borja's <a href="http://books.google.com/books/about/Estreyas_Marianas.html?id=1oAmAQAAIAAJ"><em>Istreyas Marianas: Chamorro</em></a>. The study found ~25% strict rhyme and ~75% "abstract rhyme" utilizing associations between segment classes established by Chamorro phonological processes.</p>
        <div class="card-meta">
            <span class="card-tag">Phonology</span>
            <span class="card-tag">Chamorro</span>
        </div>
        <div class="card-links">
            <a class="download-pdf a-button" href="/assets/documents/champohandout.pdf">
                <i class="fa-solid fa-file"></i>
                &nbsp;&nbsp;Handout
            </a>
        </div>
    </div>
</div>
