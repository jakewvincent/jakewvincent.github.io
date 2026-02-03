---
title: Interlinear Gloss Generator
updated: 2026-02-02
layout: default
---

A tool for generating HTML interlinear glosses—the standard format for presenting linguistic examples with word-by-word translations. Enter your words, glosses, and free translation below, and the tool will generate HTML and CSS you can paste into your website.

### Example

Here's an example of an internally headed relative clause in Chamorro (from my [MA thesis](https://cloudfront.escholarship.org/dist/prd/content/qt0jq7096r/qt0jq7096r.pdf?t=p3qtng)), rendered using the HTML and CSS this tool generates:

<div class="example">
    <div class="all-align-units">
        <div class="align-unit">
            <div class="word">Chum&aring;lik</div>
            <div class="gloss"><span>sg.agr</span>:laugh</div>
        </div>
        <div class="align-unit">
            <div class="word">i</div>
            <div class="gloss">the</div>
        </div>
        <div class="align-unit">
            <div class="word">[mat&aring;'chung</div>
            <div class="gloss"><span>sg.agr</span>.sit</div>
        </div>
        <div class="align-unit">
            <div class="word">na</div>
            <div class="gloss"><span>lk</span></div>
        </div>
        <div class="align-unit">
            <div class="word"><b>p&aring;tgun</b></div>
            <div class="gloss">child</div>
        </div>
        <div class="align-unit">
            <div class="word">gi</div>
            <div class="gloss"><span>loc</span></div>
        </div>
        <div class="align-unit">
            <div class="word">siya.]</div>
            <div class="gloss">chair</div>
        </div>
    </div>
    <div class="free-transl">
        'The <b>child</b> [who sat in the chair] laughed.'
    </div>
</div>

### Generator

{% include gloss_generator.html %}
