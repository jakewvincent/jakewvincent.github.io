---
title: "Discourse Simulator for Task-Oriented Dialogue"
layout: default
updated: 2026-02-06
---

# Discourse simulator for task-oriented dialogue

## Overview

This system simulates multi-participant, task-oriented phone conversations by modeling the discourse moves of agentic participants who interact through *discourse operations* (implemented as MCP tools) on a shared discourse structure. Rather than treating conversation as a sequence of specific types of utterances, the system adopts a discourse-theoretic perspective. It models utterances not by what they *are* (e.g., "this is a question"), but by what they *do to the context*.

The system combines insights from two theoretical areas:

**Pragmatics & Discourse Theory** (for the shared state)

1. **Farkas & Bruce (2010)** --- conversation as manipulation of shared information structures (common ground, The Table, Discourse Commitments)
2. **Portner (2007)** --- a shared To-Do List semantics for commissives and imperatives

**Agent Theory** (for private/individual states)

1. **The BDI model (Rao & Georgeff 1995)** --- agents with private Beliefs, Desires (goals), and Intentions that exist independently of and prior to the discourse, and that evolve via private operations on the individual's state over the course of a conversation

The result is a system in which agents carry rich internal states that guide their contributions to a shared workspace. The workspace tracks what has been settled (in the common ground), what remains open (on the Table), and what has been promised (in the to-do list). A set of discourse moves formally connects these two layers, and most moves include a linguistic contribution that is added to the conversation's transcript.

{% raw %}
<pre class="mermaid">
flowchart TB
    subgraph shared[" Shared Workspace "]
        CG["Common Ground"] ~~~ T["The Table"] ~~~ DC["Discourse Commitments"] ~~~ TD["To-Do Lists"]
    end

    shared -. "Discourse Briefing" .-> agent
    agent -- "Discourse Moves<br>(via MCP tools)" --> junction[ ]
    junction --> shared
    junction -.-> transcript(["Transcript"])
    style junction fill:none,stroke:none

    subgraph agent[" Agent · per participant "]
        B["Beliefs"] ~~~ G["Goals"] ~~~ I["Intentions"] ~~~ IG["Individual Ground"]
    end
</pre>
{% endraw %}

---

## Discourse state: The shared workspace

The conversational workspace (or discourse state) is modeled after Farkas & Bruce (2010). It includes several components that collectively represent the state of the discourse at any given moment.

### Common Ground

The common ground is the set of propositions mutually accepted by all participants. It starts empty and grows as participants assert, accept information, and resolve issues that are up for discussion. A proposition enters the CG only when it's been publicly committed to *and* accepted by the relevant parties. The CG represents the established shared understanding (what everyone has agreed to treat as true).

The word "accepted" is important here. Following Stalnaker (2002), the CG is a matter of common *acceptance* and not necessarily of common *belief*. A participant can accept a proposition for the purposes of the conversation, proceeding as though it were true, without recording it as a held belief. A participant might accept the other's assertion that "the earliest available time is Thursday" (in order to move the conversation forward) while privately believing an earlier slot must exist. The system reflects this possibility, since the CG and an agent's private beliefs are implemented as separate structures that can diverge. When any new CG content contradicts an agent's existing belief, the agent's Belief Revision Function determines whether the private belief is updated, but the BRF can lead the agent to reject the revision. So the common ground tracks the *discursive* state (what's been established through discourse moves) rather than *doxastic* states (what participants privately believe to be true).

### The Table

The Table contains items that are under active discussion: questions, proposals, requests, and assertions. These create conversational pressure toward resolution. Items on the Table demand attention by appearing in a discourse briefing that prompts each agent to complete their turn: a question needs an answer, a proposal needs acceptance or rejection, a request needs acknowledgment or an answer, etc. This pressure helps drive the conversation forward.

Items on the Table have a lifecycle, beginning as **`active`**, and can transition to **`awaiting acceptance`** (when an answer has been uttered but not yet accepted), **`resolved`** (whether accepted or rejected), **`amended`** (replaced by a revised version, which closes the original item and adds a new active item), or **`retracted`** (withdrawn by the original speaker).

The four item types reflect different kinds of conversational pressure:

- **Questions** seek information (*What time slots are available?*)
- **Proposals** offer a course of action for acceptance (*I can schedule that for Tuesday at 3pm*)
- **Requests and Commands** urge another party to do something (*Could you check the current availability?*, *Give me your email address now*)
- **Assertions** put something forth for acceptance (*The next available slot is on Thursday*)

### Discourse Commitments

Discourse Commitments (DC) are propositions that a speaker has *publicly committed to* but that have not yet been *mutually accepted* (into the common ground). They represent an intermediate epistemic state: the speaker is on record as having committed to something, but that proposition hasn't yet entered the CG. When the other participant accepts a DC, the proposition moves from an individual's DC to the CG. If rejected, it is removed from DC without entering the CG.

This reflects an asymmetry that is observed in natural conversational interaction: saying something is not the same as having it accepted by whoever you're talking to. Someone might assert something, committing themself to that proposition (e.g. *You were talking about me behind my back*), but it only becomes common ground when the other participant acknowledges or accepts it (*You're right, I was, and I'm sorry*).

### To-Do Lists (Portner 2007)

Incorporating Portner's (2007) To-Do List model extends our framework to track both commitments (things participants have committed themselves to *doing*) and imperatives (things participants have commanded another participant to do). Note that this is completely distinct from DCs, which are epistemic (commitments about what is true).

Each participant has a separate to-do list, to which items can be added in two ways:

- **Commissives** (promises): The speaker adds to their *own* to-do list (*I'll send you a confirmation*)
- **Directives** (requests/commands): The speaker adds to *another's* to-do list (*Please provide the necessary details*)

### Individual Ground

The Individual Ground contains private factual knowledge held by each participant that has not been shared. One participant may know their own scheduling constraints and preferences; another may know the system's current state and applicable policies. Information may move from Individual Ground to common ground through disclosure and acceptance, but private knowledge need not always be shared.

The Individual Ground is part of each participant's private state, but it is distinct from the revisable *beliefs* discussed in the [Agent Architecture](#agent-architecture-the-bdi-model) section below. Individual Ground holds stable factual records (e.g. a phone number; some status retrieved from an external system) that don't carry the uncertainty or revision dynamics that beliefs do. The two constructs come from different theoretical traditions (Farkas & Bruce for Individual Ground; Rao & Georgeff for beliefs) and serve different roles in the system.

{% raw %}
<pre class="mermaid">
flowchart TB
    assert["Agent asserts, proposes,<br>requests, or asks<br><i>(PutOnTable)</i>"]
    assert --> dc["Speaker's<br>Discourse Commitments"]
    assert --> table["The Table<br>(status: active)"]
    table --> resolve{"Other party<br>resolves"}
    resolve -->|"Accept"| cg["Common Ground"]
    resolve -->|"Reject"| stays["Stays in speaker's DC<br>(agree to disagree)"]
    dc -.->|"on acceptance"| cg

    bypass["Uncontroversial information<br><i>(AddToCommonGround)</i>"] -->|"bypasses Table"| cg
</pre>
{% endraw %}

---

## Discourse moves

Agents interact with the discourse state through a fixed set of discourse moves, each of these operationalized as a tool in the MCP server. Every move has defined effects on the discourse state's components, creating a formal connection between what an agent says and how the conversational state changes.

### Initiating moves (selected)

- **PutOnTable**: Creates a new item (question, proposal, request, or assertion) on the Table and adds the content to the speaker's Discourse Commitments.
- **AddToCommonGround**: Directly adds a proposition to the common ground, bypassing the Table. Only used for information so uncontroversial it needs no negotiation, and all participants know it needs no negotiation.
- **UpdateToDo**: Adds, completes, or cancels a to-do item. Creates commissives (promises to self) or directives (requests to other).

### Responding moves

- **AnswerQuestion**: Provides an answer to a question on the Table. The answer enters the answerer's Discourse Commitments, and the question transitions to awaiting acceptance (of the answer).
- **Resolve**: Accepts, rejects, defers, or partially accepts an item on the Table. Acceptance moves the content from DC to CG.

### Managing moves

- **Retract**: Withdraws one of the speaker's own additions to the Table
- **Amend**: Replaces, clarifies, or expands an existing Table item with a new version
- **Challenge**: Disputes a proposition in the common ground, potentially leading to belief revision
- **SelfCorrect**: Corrects a prior assertion by the same speaker

### Structural moves (selected)

- **OpenConversation/CloseConversation**: Marks conversational boundaries; closing requires no unresolved Table items and no pending to-do items
- **YieldTurn**: Explicitly yields the conversational floor (without an utterance)
- **HangUp**: Terminates the conversation abruptly without verbal closure (a nonverbal action; different from closing)

### Freeform

The **Say** move produces utterances that do not directly manipulate the discourse state: empathetic responses, acknowledgments, social pleasantries, and phatic speech. These are important for conversational naturalness but do not alter the formal state structures.

---

## Agent architecture: The BDI model

Each agentic participant in a conversation maintains a private state made up of three components, following Rao & Georgeff's (1995) BDI model.

### Beliefs (epistemic state)

Beliefs represent what an agent takes to be true about the world. Unlike propositions in the common ground (which are mutually shared with other conversational participants), beliefs are private and vary in uncertainty. In the present implementation, belief carries a confidence level (**`certain`**, **`likely`**, or **`uncertain`**) and a source (**`prior knowledge`**, **`conversation`**, **`system lookup`**, or **`inference`**).

Beliefs are also *revisable*. When new information is accepted into the common ground that contradicts an existing belief, a Belief Revision Function (BRF) belonging to the agent determines whether the individual's belief is actually updated. The BRF style is derived from the personality attributes defined in the agent's [participant profile](#participant-profiles) and is inspired by the AGM postulates (Alchourrón, Gärdenfors, & Makinson, 1985). It comes in four styles:

| Style         | Behavior                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Stubborn**  | Resists revision. Only updates uncertain beliefs; requires high-credibility evidence for likely beliefs; never revises certain beliefs. |
| **Flexible**  | Generally open to revision. Rejects only low-credibility challenges to certain beliefs.                                                 |
| **Skeptical** | Demands strong evidence for any revision, regardless of current confidence.                                                             |
| **Trusting**  | Accepts all revisions regardless of confidence or source credibility.                                                                   |

This means that the same piece of new information entering the common ground can have different effects on different agents' belief states, depending on their BRF style.

### Goals (desires)

Goals represent what an agent wants to achieve, whether private or public. They are initialized prior to the conversation and are never directly visible to other participants, though an agent could choose to express them through discourse moves. Goals have a *priority* attribute:

- **`primary`**: The main objective for the interaction (e.g. *obtain information about available appointments*)
- **`secondary`**: Desirable but not essential (e.g. *understand the scheduling constraints*)
- **`implicit`**: Background motivations that the agent may not explicitly articulate (e.g. *feel respected*, *minimize time spent*)

Goals start as **`active`** and can transition to **`achieved`** or **`abandoned`** over the course of a conversation.

### Intentions (deliberative state)

Intentions represent an agent's private plans for *how* to achieve their goals. These are distinct from public commitments (they are still part of the individual's private state); an agent may intend to propose an alternative solution but has not yet expressed this in discourse. Intentions serve as a bridge between the private state and the discourse state. When enacted, intentions typically result in discourse moves that shape how the dialogue unfolds.

### Seeding

To establish beliefs and goals before a conversation begins, each agent undergoes a *seeding phase* in which their goals, beliefs, and (optionally) intentions are initialized from their context, which includes their personal profile and any scenario information they've been provided. This simulates a mental state that will drive how each agent shows up for the onset of the conversation. For example, one participant might enter a conversation with a primary goal of scheduling an appointment, a belief that a particular time slot is available, and an intention to propose that time. Another participant might enter with a belief that they have answered a phone call, a belief about scheduling constraints, and a goal of trying to address the caller's need.

### Participant profiles

While the BDI model gives agents a mental architecture and our discourse-theoretic model gives a pragmatic architecture, profiles define each agent's identity, backstory, and personality characteristics. Each participant in a conversation is backed by a profile that specifies who they are along dimensions that shape both their behavior in discourse and the way the system initializes their mental state.

Participant profiles typically include the following categories of information.

1. **Personal information**: Name, location, and various demographic details
2. **Personality traits modeled on the Big Five**: Extroversion, openness, conscientiousness, agreeableness, and neuroticism
3. **A current state**: Mood, stress level, and urgency
4. **Linguistic characteristics**: First language, language proficiency, dialect, and disfluency rate

Profiles for participants in professional roles additionally include domain-specific attributes, including their division or department, trainings completed, years of experience, etc.

Profiles are utilized in several ways in the system. First, personality traits directly determine the agent's BRF style. High agreeableness and high openness produce a Trusting agent; low agreeableness produces a Stubborn one. The mapping from personality to BRF style means that the way an agent handles contradictory information is grounded in their profile, rather than being assigned arbitrarily.

Second, profiles are worked into the system prompt template, the actual instructions that dictate the agent's identity and behavioral characteristics throughout the conversation. An agent with high neuroticism and a stressed mood will behave differently than one who is relaxed and agreeable.

Third, profiles provide the raw material for the seeding phase. During the seeding phase, each agent reads their profile and any information they've been provided about the context or situation (their task, mood, urgency, professional context, etc.) and uses it to generate plausible initial goals, beliefs, and intentions. A profile describing a frustrated, high-urgency participant with an unresolved issue will produce different seeded goals than one describing a calm, low-urgency participant with a general inquiry.

The institutional or organizational context can also optionally play a role. Examples of this context could include policies for a participant to follow, standard operating procedures, verification protocols, and available actions. Together, these will constrain what agents can do and what resolutions are available. These contextual artifacts sit alongside participant profiles as inputs during the seeding phase, potentially affecting the initial beliefs, goals, and intentions the agents register to their private state, which in turn shapes the space of possible conversations that can be generated.

---

## MCP server

A central design decision is that agents never read or write the discourse state directly. All interaction with the shared workspace is mediated by an MCP server that exposes a set of tools with which the agents can interact with the discourse state. Agents invoke these tools by name, with parameters, to produce an utterance and update the discourse state in one step. Agents reason about which tools to call and with what arguments, and the server executes the resulting updates to the discourse state.

This is significant for two reasons. For one, it means the discourse state remains consistent: there's no way for an agent to e.g. add something to the common ground without it being properly sourced and tracked, because the only path to the common ground runs through a tool that enforces discourse norms humans naturally follow. Second, it means the agent's tool selection is itself a meaningful signal about the simulated mental activity. Selecting a tool to put a proposal on the Table for discussion is a different discourse move than using a generic tool for uttering something, even if the surface utterance might be similar. The tool choice captures the underlying pragmatics that the utterance alone might leave ambiguous.

### Tool categories

Tools fall into several categories that reflect distinct kinds of agentic actions:

1. **Discourse tools**: The main way of participating in a conversation. These tools correspond to discourse moves: putting items on the Table, resolving them, making commitments, etc. Every discourse tool that produces an utterance takes an **`utterance`** parameter (the actual utterance content, as text) alongside additional, tool-specific parameters that might further inform the discourse operation. This separates *what is said* from *what it does* to the discourse state.
2. **Preparation tools**: Internal actions that do not produce utterances. A participant recalling their own relevant details or a facilitator looking up a record in an external system return information to each agent privately, populating their Individual Ground, but nothing appears in the conversation transcript. These tools model behind-the-scenes cognitive and procedural work that underlies the discourse.
3. **Seeding tools**: Used exclusively during the pre-conversation seeding phase, when the participants establish goals, beliefs, and intentions. They are not available during the main phase of the conversation.
4. **Private state management tools**: Allow agents to update their private mental state during the conversation, such as marking a goal as achieved, revising a belief, or linking an intention to a public to-do item. These help bridge the private and public layers of the system.

---

## The conversation loop

Each turn in the conversation follows a cycle:

<div class="two-col">
<div class="two-col-text" markdown="1">

1. **Floor management**: By default, the floor is given to participants in turn.
2. **Discourse briefing**: Before each turn, the current speaker receives a structured summary of the discourse state. This briefing is the primary mechanism by which the discourse state becomes *legible* to each agent. Without it, the agents would only have the raw conversation transcript to work from and would have no *formal* awareness of what has been established, what remains open, or what has been promised.
    1. The briefing is organized to mirror the distinction between shared and private state. It begins with the common ground (established mutual facts), then presents Discourse Commitments, separated into the speaker's own assertions and those made by others. That's followed by any answers awaiting the speaker's response, which are flagged as high-priority items in need of resolution. It then shows the Table (as a list of active items under discussion), to-do lists (as pending commitments for each participant), and the speaker's Individual Ground (private knowledge).
    2. The briefing moves on to the speaker's private state: their self-registered beliefs, goals, and intentions.
    3. The briefing is perspectival: each participant sees the same shared structures but only their own private state. This asymmetry is faithful to the theoretical model: common ground is mutual, but mental states are private.
3. **Deliberation**: The agent considers the briefing alongside the conversation history to decide what to do. The briefing makes conversational pressure visible: a participant with an unresolved primary goal seeing a proposal on the Table knows they need to respond. An agent seeing unanswered questions knows there is pressure to address them. Items flagged as awaiting response create urgency that the agent can act on.
4. **Discourse moves**: The agent performs one or more discourse moves, producing utterances and updating the discourse state.
5. **State update**: The discourse state is updated to reflect the moves made.

</div>

<div class="two-col-diagram">
{% raw %}
<pre class="mermaid">
flowchart TB
    floor["1. Floor Management<br><i>Assign the floor</i>"]
    floor --> briefing["2. Discourse Briefing<br><i>Summarize state for speaker</i>"]
    briefing --> deliberation["3. Deliberation<br><i>Agent reasons about response</i>"]
    deliberation --> moves["4. Discourse Moves<br><i>Agent acts and speaks</i>"]
    moves --> update["5. State Update<br><i>Discourse state updated</i>"]
    update --> check{"Completion<br>condition?"}
    check -->|"No"| floor
    check -->|"Close / Limit / Hang up"| done(["Conversation ends"])
</pre>
{% endraw %}
</div>

</div>


This loop continues until a completion condition is met: the conversation is formally closed (possible if there are no unresolved items), the configured turn limit is reached, or a participant hangs up or abandons the conversation.

---

## References

<div class="csl-bib-body" style="line-height: 1.35; margin-left: 2em; text-indent:-2em;">
  <div class="csl-entry" style="margin-bottom: 1em;">Alchourrón, Carlos E., Peter Gärdenfors, and David Makinson. “On the Logic of Theory Change: Partial Meet Contraction and Revision Functions.” <i>Journal of Symbolic Logic</i> 50, no. 2 (1985): 510–30. <a href="https://doi.org/10.2307/2274239">https://doi.org/10.2307/2274239</a>.</div>
  <span class="Z3988" title="url_ver=Z39.88-2004&amp;ctx_ver=Z39.88-2004&amp;rfr_id=info%3Asid%2Fzotero.org%3A2&amp;rft_id=info%3Adoi%2F10.2307%2F2274239&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.genre=article&amp;rft.atitle=On%20the%20logic%20of%20theory%20change%3A%20Partial%20meet%20contraction%20and%20revision%20functions&amp;rft.jtitle=Journal%20of%20Symbolic%20Logic&amp;rft.stitle=J.%20symb.%20log.&amp;rft.volume=50&amp;rft.issue=2&amp;rft.aufirst=Carlos%20E.&amp;rft.aulast=Alchourr%C3%B3n&amp;rft.au=Carlos%20E.%20Alchourr%C3%B3n&amp;rft.au=Peter%20G%C3%A4rdenfors&amp;rft.au=David%20Makinson&amp;rft.date=1985-06&amp;rft.pages=510-530&amp;rft.spage=510&amp;rft.epage=530&amp;rft.issn=0022-4812%2C%201943-5886&amp;rft.language=en"></span>
  <div class="csl-entry" style="margin-bottom: 1em;">Farkas, D. F., and K. B. Bruce. “On Reacting to Assertions and Polar Questions.” <i>Journal of Semantics</i> 27, no. 1 (2010): 81–118. <a href="https://doi.org/10.1093/jos/ffp010">https://doi.org/10.1093/jos/ffp010</a>.</div>
  <span class="Z3988" title="url_ver=Z39.88-2004&amp;ctx_ver=Z39.88-2004&amp;rfr_id=info%3Asid%2Fzotero.org%3A2&amp;rft_id=info%3Adoi%2F10.1093%2Fjos%2Fffp010&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.genre=article&amp;rft.atitle=On%20Reacting%20to%20Assertions%20and%20Polar%20Questions&amp;rft.jtitle=Journal%20of%20Semantics&amp;rft.stitle=Journal%20of%20Semantics&amp;rft.volume=27&amp;rft.issue=1&amp;rft.aufirst=D.%20F.&amp;rft.aulast=Farkas&amp;rft.au=D.%20F.%20Farkas&amp;rft.au=K.%20B.%20Bruce&amp;rft.date=2010-02-01&amp;rft.pages=81-118&amp;rft.spage=81&amp;rft.epage=118&amp;rft.issn=0167-5133%2C%201477-4593&amp;rft.language=en"></span>
  <div class="csl-entry" style="margin-bottom: 1em;">Portner, Paul. “Imperatives and Modals.” <i>Natural Language Semantics</i> 15, no. 4 (2007): 351–83. <a href="https://doi.org/10.1007/s11050-007-9022-y">https://doi.org/10.1007/s11050-007-9022-y</a>.</div>
  <span class="Z3988" title="url_ver=Z39.88-2004&amp;ctx_ver=Z39.88-2004&amp;rfr_id=info%3Asid%2Fzotero.org%3A2&amp;rft_id=info%3Adoi%2F10.1007%2Fs11050-007-9022-y&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.genre=article&amp;rft.atitle=Imperatives%20and%20modals&amp;rft.jtitle=Natural%20Language%20Semantics&amp;rft.volume=15&amp;rft.issue=4&amp;rft.aufirst=Paul&amp;rft.aulast=Portner&amp;rft.au=Paul%20Portner&amp;rft.date=2007&amp;rft.pages=351-383&amp;rft.spage=351&amp;rft.epage=383&amp;rft.issn=0925854X"></span>
  <div class="csl-entry" style="margin-bottom: 1em;">Rao, Anand S., and Michael P. Georgeff. “BDI Agents: From Theory to Practice.” Paper presented at Internatinal Conference on Multiagent Systems. <i>Proceedings of the First International Conference on Multiagent Systems</i>, 1995. <a href="https://cdn.aaai.org/ICMAS/1995/ICMAS95-042.pdf">https://cdn.aaai.org/ICMAS/1995/ICMAS95-042.pdf</a>.</div>
  <span class="Z3988" title="url_ver=Z39.88-2004&amp;ctx_ver=Z39.88-2004&amp;rfr_id=info%3Asid%2Fzotero.org%3A2&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook&amp;rft.genre=proceeding&amp;rft.atitle=BDI%20Agents%3A%20From%20Theory%20to%20Practice&amp;rft.btitle=Proceedings%20of%20the%20First%20International%20Conference%20on%20Multiagent%20Systems&amp;rft.publisher=AAAI&amp;rft.aufirst=Anand%20S.&amp;rft.aulast=Rao&amp;rft.au=Anand%20S.%20Rao&amp;rft.au=Michael%20P.%20Georgeff&amp;rft.date=1995"></span>
  <div class="csl-entry">Stalnaker, Robert. “Common Ground.” <i>Linguistics and Philosophy</i> 25, no. 5/6 (2002): 701–21. <a href="https://doi.org/10.1023/A:1020867916902">https://doi.org/10.1023/A:1020867916902</a>.</div>
  <span class="Z3988" title="url_ver=Z39.88-2004&amp;ctx_ver=Z39.88-2004&amp;rfr_id=info%3Asid%2Fzotero.org%3A2&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.genre=article&amp;rft.atitle=Common%20Ground&amp;rft.jtitle=Linguistics%20and%20Philosophy&amp;rft.volume=25&amp;rft.issue=5%2F6&amp;rft.aufirst=Robert&amp;rft.aulast=Stalnaker&amp;rft.au=Robert%20Stalnaker&amp;rft.date=2002&amp;rft.pages=701-721&amp;rft.spage=701&amp;rft.epage=721"></span>
</div>

<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
        },
        securityLevel: 'loose'
    });
</script>
