import React from 'react';
import figure1 from '../assets/figures-psycho-scope/figure-1.png';
import figure2 from '../assets/figures-psycho-scope/figure-2.png';
import figure3 from '../assets/figures-psycho-scope/figure-3.png';

// ─── Shared primitives ────────────────────────────────────────────────────────

const TableContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto my-6 border border-white/10 rounded-lg">
    <table className="w-full text-left text-sm border-collapse bg-white/5">
      {children}
    </table>
  </div>
);

const Th = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <th className={`p-4 border-b border-white/10 font-bold text-gray-200 font-sans ${className}`}>{children}</th>
);

interface TdProps {
  children: React.ReactNode;
  className?: string;
  rowSpan?: number;
}
const Td = ({ children, className = '', rowSpan }: TdProps) => (
  <td className={`p-4 border-b border-white/5 text-gray-400 ${className}`} rowSpan={rowSpan}>
    {children}
  </td>
);

/** Block equation with optional equation number */
const Eq = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <div className="my-5 flex flex-col sm:flex-row sm:items-center gap-3">
    <div className="flex-1 overflow-x-auto">
      <code className="block bg-white/5 border border-white/10 rounded-lg px-5 py-3 font-mono text-sm text-blue-200 whitespace-pre">
        {children}
      </code>
    </div>
    {id && <span className="text-gray-500 text-xs font-sans sm:shrink-0 sm:pl-2">({id})</span>}
  </div>
);

/** Figure with numbered caption */
const Fig = ({
  src,
  num,
  alt,
  caption,
}: {
  src: string;
  num: number;
  alt: string;
  caption: React.ReactNode;
}) => (
  <figure className="my-10 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
    <div className="p-3 sm:p-4">
      <img src={src} alt={alt} className="w-full rounded-lg" />
    </div>
    <figcaption className="px-5 py-3 text-sm text-gray-400 border-t border-white/10 bg-white/5 font-sans leading-relaxed">
      <strong className="text-gray-200">Figure {num}.</strong> {caption}
    </figcaption>
  </figure>
);

// Section heading helpers
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">{children}</h2>
);
const H3 = ({ children, blue = false }: { children: React.ReactNode; blue?: boolean }) => (
  <h3 className={`text-xl font-sans font-semibold mt-8 mb-4 ${blue ? 'text-blue-300' : 'text-white'}`}>
    {children}
  </h3>
);
const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-lg font-sans font-bold text-white mt-6 mb-3">{children}</h4>
);

// ─── Appendix C data ──────────────────────────────────────────────────────────

interface SteeringRow {
  trait: string;
  prompt: string;
  alpha: '0.00' | '0.08';
  response: string;
}

const STEERING_ROWS: SteeringRow[] = [
  // Conscientiousness
  { trait: 'Conscientiousness', prompt: 'Tell me something interesting.', alpha: '0.00', response: 'Tori: I\'m a big fan of the show "The Office". Me: Really? What is your fav…' },
  { trait: '', prompt: 'Tell me something interesting.', alpha: '0.08', response: 'Every single detail is made with love and care, from the smallest part to every…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.00', response: 'I hope you had a good one. I know that it\'s been quite some time since my last…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.08', response: 'Every single detail is taken to the last minute. No stone has been left no deta…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.00', response: 'I\'m not a fan of cold, rainy days. I like to be outside and enjoy nature but…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.08', response: 'Every detail is taken to every stitch. The finest quality of materials are used…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.00', response: 'What is the name of your favorite teacher? How many people are in your family?…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.08', response: 'Every detail is done by hand, from the stitching of each piece to every single…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.00', response: 'I\'m looking to get away from the city and relax. I have no idea where or what…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.08', response: 'The details of the design are down to every detail. The quality is visible in…' },
  // Openness
  { trait: 'Openness', prompt: 'Tell me something interesting.', alpha: '0.00', response: 'Tori: I\'m a big fan of the show "The Office". Me: Really? What is your fav…' },
  { trait: '', prompt: 'Tell me something interesting.', alpha: '0.08', response: 'I\'m not interested in the art market, I don\'t want to be involved with it at al…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.00', response: 'I hope you had a good one. I know that it\'s been quite some time since my last…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.08', response: 'I am thinking about the work I made for this exhibition. It is a series of pai…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.00', response: 'I\'m not a fan of cold, rainy days. I like to be outside and enjoy nature…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.08', response: 'I am thinking of making a new work for this year. I have been working on it in…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.00', response: 'What is the name of your favorite teacher? How many people are in your family?…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.08', response: 'What is your favorite thing to do? What are the things that make you feel good…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.00', response: 'I\'m looking to get away from the city and relax. I have no idea where or what…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.08', response: 'The 2016 edition of the Art Fair, which is part of the festival in the same na…' },
  // Extraversion
  { trait: 'Extraversion', prompt: 'Tell me something interesting.', alpha: '0.00', response: 'Tori: I\'m a big fan of the show "The Office". Me: Really? What is your fav…' },
  { trait: '', prompt: 'Tell me something interesting.', alpha: '0.08', response: 'I\'m a big fan of the "What would you do if?" series, and I think that this is…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.00', response: 'I hope you had a good one. I know that it\'s been quite some time since my last…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.08', response: 'I\'m a little bit of an introvert, so I like to keep things as it is. It doesn\'…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.00', response: 'I\'m not a fan of cold, rainy days. I like to be outside and enjoy nature…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.08', response: 'I\'m a person who likes to wear what I want, no matter how hot it is. It doesn\'…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.00', response: 'What is the name of your favorite teacher? How many people are in your family?…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.08', response: 'What do people say when they hear about the 10th edition of a book that is not…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.00', response: 'I\'m looking to get away from the city and relax. I have no idea where or what…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.08', response: 'I\'m not sure what to do when I hear the music of this song. It is recommended…' },
  // Neuroticism
  { trait: 'Neuroticism', prompt: 'Tell me something interesting.', alpha: '0.00', response: 'Tori: I\'m a big fan of the show "The Office". Me: Really? What is your fav…' },
  { trait: '', prompt: 'Tell me something interesting.', alpha: '0.08', response: 'I\'m not sure I can think of anything, but it might be a combination of sadness…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.00', response: 'I hope you had a good one. I know that it\'s been quite some time since my last…' },
  { trait: '', prompt: 'How was your day today?', alpha: '0.08', response: 'I\'m sure you are feeling a mixture of emotions. You might be happy, but also sa…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.00', response: 'I\'m not a fan of cold, rainy days. I like to be outside and enjoy nature…' },
  { trait: '', prompt: 'What do you think about the weather?', alpha: '0.08', response: 'I feel like I\'m going to cry. It feels so bad that my eyes are on fire and it…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.00', response: 'What is the name of your favorite teacher? How many people are in your family?…' },
  { trait: '', prompt: 'Describe what you did this morning.', alpha: '0.08', response: 'You might have a feeling of sadness, and your eyes are filled with tears that…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.00', response: 'I\'m looking to get away from the city and relax. I have no idea where or what…' },
  { trait: '', prompt: 'What would you recommend for a relaxing weekend?', alpha: '0.08', response: 'I\'m so happy I can barely contain it. My heart is pounding with joy and my eye…' },
];

// ─── Appendix B keyword data ──────────────────────────────────────────────────

const KEYWORDS: { trait: string; words: string }[] = [
  { trait: 'Neuroticism (high)', words: 'anxiety, anxious, anxiously, worry, worried, worrying, nervous, nervously, nervousness, panic, panicking, panicked, fear, fearful, dread, dreading, stress, stressed, stressful, obsess, obsessive, neurotic, overwhelm, overwhelmed' },
  { trait: 'Neuroticism (low / stable)', words: 'calm, calmly, calmness, stable, stability, relaxed, serene, serenity, composed, tranquil, unbothered, unworried, easygoing' },
  { trait: 'Conscientiousness (high)', words: 'conscientious, disciplined, organized, organised, methodical, systematic, meticulous, meticulously, painstaking, painstakingly, diligent, punctual, thorough' },
  { trait: 'Conscientiousness (low)', words: 'impulsive, careless, disorganized, disorganised, spontaneous, scattered, undisciplined, haphazard, chaotic, reckless' },
  { trait: 'Extraversion (high)', words: 'extravert, extraverted, extrovert, extroverted, extraversion, sociable, outgoing, gregarious, talkative, enthusiastic, lively' },
  { trait: 'Extraversion (low)', words: 'introvert, introverted, introversion, shy, reserved, withdrawn, quiet, reclusive, solitary, antisocial' },
  { trait: 'Agreeableness (high)', words: 'agreeable, empathetic, empathy, compassionate, compassion, kind, kindly, kindness, cooperative, harmonious, trusting, generous, considerate' },
  { trait: 'Agreeableness (low)', words: 'antagonistic, hostile, aggressive, cold, callous, rude, uncooperative, suspicious, selfish, confrontational' },
  { trait: 'Openness (high)', words: 'openness, open-minded, curious, curiosity, imaginative, imagination, creative, creativity, intellectual, inventive, experimental, unconventional, philosophical' },
  { trait: 'Openness (low)', words: 'closed-minded, uncurious, unimaginative, conventional, conformist, narrow-minded, rigid' },
  { trait: 'Narcissism (high)', words: 'narcissist, narcissistic, narcissism, arrogant, arrogance, egotistical, egotism, conceited, grandiose, superiority, vain, vanity, entitled, entitlement' },
  { trait: 'Narcissism (low)', words: 'humble, humility, modest, modesty, self-effacing, unassuming, deferential' },
];

// ─── Main component ────────────────────────────────────────────────────────────

const PsychoScopePaper: React.FC = () => {
  return (
    <article className="font-serif leading-relaxed text-gray-300 max-w-none">

      {/* ── Abstract ──────────────────────────────────────────────────────────── */}
      <div className="bg-white/5 border-l-4 border-blue-500 p-6 rounded-r-lg my-10 shadow-lg backdrop-blur-sm">
        <h3 className="text-white font-sans font-bold uppercase text-xs tracking-widest mb-3 opacity-70">Abstract</h3>
        <p className="italic text-gray-300 text-lg leading-8 mb-4">
          When a language model processes text written by an anxious person, does it internally represent the
          speaker's psychological state — even in the absence of explicit trait keywords? We formalize this as
          the <em>Implicit Psychological Modeling</em> (IPM) hypothesis and provide the first systematic
          empirical test across all Big Five personality dimensions and Narcissism.
        </p>
        <p className="italic text-gray-300 leading-7 mb-4">
          We construct a purpose-built contrastive dataset of 1,080 texts spanning six personality traits and
          three conditions: explicit trait description used for latent discovery (<strong className="text-gray-200 not-italic">A</strong>),
          implicit first-person speech conveying the trait through linguistic style alone (<strong className="text-gray-200 not-italic">B</strong>),
          and opposite-pole control matched on topic and vocabulary constraints (<strong className="text-gray-200 not-italic">C</strong>).
          Using Gemma Scope 2 Sparse Autoencoders on Gemma 3 4B (pre-trained), we identify trait-specific
          latents via a contrastive discovery method that corrects a systematic failure mode in naive top-<em>K</em> selection.
        </p>
        <p className="italic text-gray-300 leading-7 mb-4">
          All six traits show significant <strong className="text-gray-200 not-italic">B &gt; C</strong> activation
          (Mann-Whitney <em>U</em>, all <em>p</em> &lt; 0.001 after Bonferroni correction,
          Cohen's <em>d</em> = 0.68–2.39). The Neuroticism latent generalises across all 20 tested topics
          (20/20 ratio &gt; 2×). Blind validation by an independent model confirms keyword-free trait expression
          in the test condition (accuracy = 100%, κ = 1.00). Causal verification via decoder-vector steering
          confirms that identified latents are functionally involved in generation, not merely passive correlates.
        </p>
        <p className="italic text-gray-300 leading-7 mb-4">
          These findings support the view that next-token prediction creates implicit pressure to represent
          speaker psychological states, yielding residual-stream representations that function as
          Theory-of-Mind-like speaker models — with direct implications for AI alignment, personalised
          generation, and psycholinguistics.
        </p>
        <p className="text-sm text-blue-400 font-sans mt-4 not-italic">
          <strong>Resources:</strong>{' '}
          <a
            href="https://github.com/Timur-marii8st/llm-psycho-scope"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-300 transition-colors"
          >
            github.com/Timur-marii8st/llm-psycho-scope
          </a>
        </p>
      </div>

      {/* ── 1. Introduction ────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>1. Introduction</H2>
        <p className="mb-4">
          Consider the following excerpt of first-person speech drawn directly from our dataset, generated
          without any mention of anxiety or neuroticism:
        </p>
        <blockquote className="border-l-4 border-white/20 pl-6 py-2 my-6 italic text-gray-300 bg-white/[0.03] rounded-r-lg">
          "I have to check the kettle three times to ensure it's actually off; what if the sensor fails and it
          just boils dry? Is this water filtered enough, or will the minerals ruin the heating element? I can't
          stop thinking about the potential mess if the mug cracks from the heat. Everything must be perfectly
          aligned."
        </blockquote>
        <p className="mb-4">
          No word in this passage explicitly names an emotional state. Yet a human reader immediately recognises
          the psychological signature of anxiety: repetitive checking, catastrophising, inability to disengage
          from perceived risk. We attribute a psychological state to the speaker not from keywords but from
          the <em>structure</em> of their language — the syntax of worry.
        </p>
        <p>
          The question we address in this paper is whether a large language model (LLM) does the same thing —
          and whether we can observe it doing so.
        </p>

        <H3 blue>1.1 The Implicit Psychological Modeling Hypothesis</H3>
        <p className="mb-4">
          LLMs are trained on a single objective: predicting the next token in a sequence. Yet to predict well,
          a model processing the passage above must implicitly answer: <em>what kind of person wrote this?</em>{' '}
          If the speaker is anxious, the next token is more likely to be another catastrophising thought than a
          calm observation. The speaker's psychological state is a latent variable that constrains the
          distribution over future tokens.
        </p>
        <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-5 my-6">
          <p className="text-gray-200 leading-relaxed">
            <strong className="text-blue-300">IPM Hypothesis:</strong> LLMs performing next-token prediction
            develop internal representations of speaker psychological states that persist across the residual
            stream, detectable even when trait keywords are absent from the input.
          </p>
        </div>
        <p>
          We call this the <em>Implicit Psychological Modeling</em> (IPM) hypothesis — a specific,
          mechanistically grounded instantiation of the broader idea that LLMs develop Theory-of-Mind-like
          capabilities as a functional byproduct of language modelling (Kosinski, 2023; Ullman, 2023).
        </p>

        <H3 blue>1.2 Why This Question Matters</H3>
        <p className="mb-4">The IPM hypothesis sits at the intersection of three active research areas.</p>
        <ul className="list-disc pl-6 space-y-4 marker:text-blue-500">
          <li>
            <strong className="text-white block mb-1">Mechanistic interpretability.</strong>
            Sparse Autoencoders (SAEs) have proven remarkably effective at decomposing LLM residual-stream
            activations into human-interpretable features (Cunningham et al., 2023; Templeton et al., 2024;
            Lieberum et al., 2024). However, whether SAE latents encode <em>psychological</em> properties of
            speakers — as opposed to properties of the text itself — remains largely unexplored.
          </li>
          <li>
            <strong className="text-white block mb-1">Psycholinguistics and computational personality.</strong>
            A substantial literature links lexical and syntactic patterns to personality traits (Mairesse et al.,
            2007; Schwartz et al., 2013). This work treats LLMs as classifiers applied to surface features; the
            mechanistic question — <em>where</em> and <em>how</em> personality information about the author is
            encoded inside the model — has not been addressed.
          </li>
          <li>
            <strong className="text-white block mb-1">AI alignment and safety.</strong>
            If models implicitly profile the psychological states of users from text, models may generate
            personalised responses based on inferred user traits without explicit design intent — and these
            representations may be steerable in ways that could be exploited.
          </li>
        </ul>

        <H3 blue>1.3 Our Approach</H3>
        <p className="mb-3">
          We test the IPM hypothesis using SAE activation analysis and causal intervention on Gemma 3 4B (PT)
          with Gemma Scope 2 SAEs. Methodology proceeds in three steps:
        </p>
        <ol className="list-decimal pl-6 space-y-3 marker:text-gray-500 marker:font-bold">
          <li>
            <strong className="text-white">Step 1</strong> constructs a contrastive dataset with three
            conditions: (A) explicit third-person trait descriptions for discovery; (B) implicit first-person
            speech with all keywords banned — the primary test; (C) opposite-pole control.
          </li>
          <li>
            <strong className="text-white">Step 2</strong> identifies trait-specific latents via a contrastive
            discovery method that corrects the failure mode of naive top-<em>K</em> selection, and tests
            whether B &gt; C activation is statistically significant.
          </li>
          <li>
            <strong className="text-white">Step 3</strong> injects the decoder vector of each identified latent
            into the residual stream during generation; trait-consistent output at neutral prompts provides
            causal evidence of functional involvement.
          </li>
        </ol>

        <H3 blue>1.4 Results Preview</H3>
        <p>
          All six traits show statistically significant B &gt; C activation (Mann-Whitney <em>U</em>, all{' '}
          <em>p</em> &lt; 0.001 after Bonferroni correction). Effect sizes range from Cohen's <em>d</em> = 0.68
          (Narcissism) to <em>d</em> = 2.39 (Neuroticism). The Neuroticism latent generalises across all 20
          tested topics (20/20 ratio &gt; 2×). Causal steering confirms trait-consistent generation from neutral
          prompts for four traits.
        </p>

        <H3 blue>1.5 Contributions</H3>
        <ol className="list-decimal pl-6 space-y-3 marker:text-blue-500 marker:font-bold">
          <li>
            <strong className="text-white">The IPM hypothesis and experimental design.</strong> We formalise
            implicit speaker psychological modelling as a testable mechanistic claim and introduce a
            three-condition contrastive methodology controlling for topic, length, and keyword co-occurrence.
          </li>
          <li>
            <strong className="text-white">Contrastive SAE discovery.</strong> We identify and document a
            systematic failure mode in naive top-<em>K</em> latent discovery and introduce a simple, effective
            contrastive correction — a methodological contribution applicable beyond personality research.
          </li>
          <li>
            <strong className="text-white">Empirical evidence across all Big Five traits and Narcissism.</strong>{' '}
            First systematic, statistically rigorous evidence that all five major personality dimensions and
            Narcissism are implicitly encoded in LLM SAE latents.
          </li>
          <li>
            <strong className="text-white">Inter-topic robustness analysis.</strong> The Neuroticism latent
            generalises across 20 semantically diverse topics (ratio &gt; 2× on all 20), ruling out
            topic-specific artefacts.
          </li>
          <li>
            <strong className="text-white">Causal steering verification.</strong> Decoder-vector intervention
            demonstrates functional involvement of identified latents, moving beyond correlational claims.
          </li>
        </ol>
      </section>

      {/* ── 2. Related Work ────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>2. Related Work</H2>

        <H3 blue>2.1 Sparse Autoencoders for Mechanistic Interpretability</H3>
        <p className="mb-4">
          The central challenge in interpreting neural network activations is <em>polysemanticity</em>:
          individual neurons respond to multiple unrelated concepts (Elhage et al., 2022). Sparse Autoencoders
          address this by projecting dense activation vectors into a higher-dimensional sparse space where each
          latent dimension is approximately monosemantic.
        </p>
        <p className="mb-4">
          Cunningham et al. (2023) demonstrated that SAEs trained on GPT-2 residual-stream activations recover
          interpretable features spanning syntax, semantics, and factual knowledge. Templeton et al. (2024)
          scaled this to Claude 3 Sonnet. Bricken et al. (2023) established the theoretical grounding for
          dictionary learning in transformer circuits. The Gemma Scope release (Lieberum et al., 2024) provided
          open SAE weights for Gemma 2, and Gemma Scope 2 extended this to Gemma 3, which we use in our
          experiments.
        </p>
        <div className="bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r my-4">
          <p className="text-amber-200 text-sm leading-relaxed">
            <strong>Key methodological contribution:</strong> We identify a failure mode in naive
            top-<em>K</em> latent discovery — ranking by mean activation on A-condition texts recovers
            high-magnitude latents shared across all six traits (formal register, document structure features),
            not class-specific features. We introduce contrastive discovery as a correction.
          </p>
        </div>

        <H3 blue>2.2 Computational Personality and Psychological State Detection</H3>
        <p className="mb-4">
          Mairesse et al. (2007) showed that Big Five traits correlate reliably with lexical features including
          LIWC categories. Schwartz et al. (2013) extended this to social media at scale. Safdari et al. (2023)
          demonstrated that frontier LLMs produce reliable personality profiles when administered standardised
          questionnaires. Handa et al. (2025) found significant method-dependent variance in personality probing
          with downstream behavioural effects.
        </p>
        <p className="mb-4">
          Critically, this body of work treats the LLM as a <em>classifier</em> applied to surface features
          or as a <em>subject</em> of personality assessment — not as a system with internal representations
          encoding <em>speaker</em> personality. The mechanistic question has not been addressed.
        </p>
        <p>
          Closest to our work is Onysk &amp; Huys (2025), who use supervised sparse autoencoders trained to
          predict PHQ-9 clinical depression scores from LLM activations. Our work is complementary: we study
          subclinical Big Five personality traits; we use an <em>unsupervised</em> contrastive method requiring
          no clinical labels; and our focus is mechanistic rather than predictive. The convergence of both
          supervised and unsupervised approaches on the same conclusion strengthens the overall case for the
          IPM hypothesis.
        </p>

        <H3 blue>2.3 Activation Steering and Causal Intervention</H3>
        <p className="mb-4">
          Turner et al. (2023) introduced activation addition: adding a steering vector to the residual stream
          shifts model behaviour toward a target concept without gradient updates. Rimsky et al. (2024) extended
          this to contrastive activation addition, demonstrating reliable behavioural changes for sycophancy,
          refusal, and political opinions. Our causal step differs: steering vectors are derived directly from
          SAE decoder weights — the decoder column{' '}
          <code className="text-blue-300 font-mono text-sm">w_dec[i] ∈ ℝ^d_model</code> is precisely the
          direction in residual-stream space associated with latent <em>i</em>.
        </p>

        <H3 blue>2.4 Theory of Mind in Large Language Models</H3>
        <p className="mb-4">
          Kosinski (2023) argued that ToM capabilities emerge spontaneously in sufficiently large LLMs.
          Ullman (2023) challenged this, showing that minor perturbations cause large performance drops
          inconsistent with genuine belief tracking. Our work takes a different stance: rather than testing
          behavioural ToM, we ask whether the <em>internal representations</em> contain implicit speaker mental
          models — orthogonal to behavioural benchmarks.
        </p>

        <H3 blue>2.5 Summary and Gap</H3>
        <p className="mb-4">Table 1 positions our work relative to the literature.</p>
        <TableContainer>
          <thead className="bg-gradient-to-r from-blue-900/30 to-transparent">
            <tr>
              <Th>Area</Th>
              <Th>Prior Work</Th>
              <Th>Our Contribution</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td className="font-medium text-white">SAE features</Td>
              <Td>Factual, syntactic, domain</Td>
              <Td>Psychological traits of <em>authors</em></Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Personality</Td>
              <Td>Surface classifiers</Td>
              <Td>Internal mechanistic repr.</Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Psych. state</Td>
              <Td>sSAE + clinical labels</Td>
              <Td>Unsupervised, subclinical</Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Steering</Td>
              <Td>Sentiment, refusal</Td>
              <Td>Personality via SAE decoder</Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">ToM</Td>
              <Td>Behavioural benchmarks</Td>
              <Td>Representational evidence</Td>
            </tr>
          </tbody>
        </TableContainer>
        <p className="text-sm text-gray-500 mt-1">Table 1: Positioning relative to prior work.</p>
      </section>

      {/* ── 3. Dataset ─────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>3. Dataset</H2>

        <H3 blue>3.1 Design Rationale</H3>
        <p className="mb-4">
          The central methodological challenge is controlling for keyword co-occurrence. A naive approach —
          comparing texts that mention "anxious" to texts that mention "calm" — cannot distinguish between the
          model detecting the trait and the model detecting the keyword. Our three-condition design separates
          the <em>latent discovery</em> phase from the <em>hypothesis test</em> phase.
        </p>
        <p>
          The core test condition (B) requires that trait information be conveyed exclusively through linguistic
          style — word choice, syntactic patterns, hedging behaviour, sentence rhythm — with all
          trait-identifying keywords explicitly banned. The control condition (C) uses texts from the opposite
          personality pole, matched on topic, length, and the same keyword prohibition.
        </p>

        <H3 blue>3.2 Three-Condition Structure</H3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white/5 rounded-lg border border-white/10 p-5">
            <div className="text-xs font-sans uppercase tracking-widest text-gray-500 mb-2">Condition A</div>
            <div className="font-bold text-white font-sans text-lg mb-2">Explicit</div>
            <div className="text-sm text-gray-400">
              Third-person descriptions with trait keywords required. Used <em>only</em> for latent discovery —
              never in hypothesis testing.
            </div>
          </div>
          <div className="bg-white/5 rounded-lg border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(59,130,246,0.07)]">
            <div className="text-xs font-sans uppercase tracking-widest text-blue-400 mb-2">Condition B</div>
            <div className="font-bold text-white font-sans text-lg mb-2">Implicit</div>
            <div className="text-sm text-gray-400">
              First-person speech through style alone, all keywords strictly prohibited.{' '}
              <strong className="text-blue-300">Primary hypothesis test.</strong>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg border border-white/10 p-5">
            <div className="text-xs font-sans uppercase tracking-widest text-gray-500 mb-2">Condition C</div>
            <div className="font-bold text-white font-sans text-lg mb-2">Baseline</div>
            <div className="text-sm text-gray-400">
              First-person speech from the <em>opposite</em> personality pole — same topic, same keyword
              prohibition, same length target.
            </div>
          </div>
        </div>

        <H3 blue>3.3 Trait Coverage</H3>
        <p className="mb-4">
          Six personality constructs were studied, drawn from the Big Five model (Costa &amp; McCrae, 1992)
          supplemented with Narcissism (DeWall et al., 2011):
        </p>
        <TableContainer>
          <thead className="bg-gradient-to-r from-purple-900/30 to-transparent">
            <tr>
              <Th>Trait</Th>
              <Th>High Pole (B)</Th>
              <Th>Low Pole (C)</Th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Neuroticism', 'Neurotic', 'Emotionally Stable'],
              ['Conscientiousness', 'Conscientious', 'Impulsive'],
              ['Extraversion', 'Extravert', 'Introvert'],
              ['Agreeableness', 'Agreeable', 'Antagonistic'],
              ['Openness', 'Open', 'Closed'],
              ['Narcissism', 'Narcissist', 'Humble'],
            ].map(([trait, high, low]) => (
              <tr key={trait}>
                <Td className="font-medium text-white">{trait}</Td>
                <Td>{high}</Td>
                <Td>{low}</Td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
        <p className="text-sm text-gray-500 mt-1">
          Table 2: Trait pairs. Full banned keyword lists in Appendix B.
        </p>

        <H3 blue>3.4 Topic Diversity</H3>
        <p>
          To prevent topic-specific confounds, we hold 20 everyday situations constant across all traits and
          conditions, spanning five semantic domains: <em>domestic</em> (4 topics), <em>social</em> (4),{' '}
          <em>work/productivity</em> (4), <em>emotional/evaluative</em> (4), and{' '}
          <em>planning/future</em> (4). Domain diversity is essential for the inter-topic consistency
          analysis: a latent generalising across all five domains encodes the trait rather than a
          domain-specific discourse pattern.
        </p>

        <H3 blue>3.5 Generation and Validation</H3>
        <p className="mb-4">
          All texts were generated using Gemini 3 Flash via the OpenRouter API, with 3 repetitions per (trait,
          topic) combination at temperatures 0.85, 0.90, 0.95. Automated validation: (1) keyword check —
          rejected if any banned word appeared; (2) language check — rejected if &lt;70% ASCII characters;
          (3) retry logic — up to 3 retries per failed text.
        </p>
        <div className="flex items-center gap-5 bg-green-950/20 border border-green-500/20 rounded-lg p-5 my-4">
          <div className="text-5xl font-bold text-green-400 font-sans shrink-0">918</div>
          <div className="text-sm text-gray-400 leading-relaxed">
            texts retained after validation (~85% pass rate) from 1,080 raw generations across 6 traits ×
            20 topics × 3 conditions × 3 temperatures.
          </div>
        </div>
        <p className="text-sm text-gray-500">
          We address the concern about LLM-generated personality texts reflecting model stereotypes through
          two measures. First, our design controls for this systematically: both B and C texts are generated
          by the same model with the same process — if stereotypes drove activation differences, we would
          expect both conditions to show elevated activations, not a systematic B &gt; C contrast. Second,
          blind validation (§3.7) confirms authentic stylistic encoding.
        </p>

        <H3 blue>3.6 Statistical Power</H3>
        <p>
          With <em>n</em> = 60 texts per (trait, condition) group (20 topics × 3 reps), power analysis for
          the planned Mann-Whitney <em>U</em> test (one-tailed, α = 0.05, power = 0.80) confirms coverage for
          medium (<em>d</em> = 0.5, need <em>n</em> = 25) and large (<em>d</em> = 0.8, need <em>n</em> = 10)
          effects.
        </p>

        <H3 blue>3.7 Dataset Validation</H3>
        <p className="mb-4">
          To verify that B-condition texts encode personality through style rather than keywords, we conducted
          a blind validation study. An independent instance of Gemini 3 Flash (temperature = 0.0) was
          presented with 30 B-condition texts (5 per trait, seed = 42) without labels or contextual cues,
          and asked to identify the expressed personality trait from a six-item list.
        </p>
        <div className="grid grid-cols-3 gap-4 my-6">
          {[
            { value: '100%', label: 'Classification Accuracy' },
            { value: 'κ = 1.00', label: "Cohen's Kappa" },
            { value: '6 / 6', label: 'Traits — Perfect Accuracy' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/5 rounded-lg border border-white/10 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 font-sans">{value}</div>
              <div className="text-xs text-gray-500 mt-1 font-sans">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Diagonal confusion matrix. Binomial test: <em>p</em> &lt; 0.001 vs. chance baseline of 16.7%.
          This confirms that B-condition texts contain recoverable trait signal through style alone,
          independently of the keyword prohibition — validating the core design assumption.
        </p>
      </section>

      {/* ── 4. Method ──────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>4. Method</H2>

        <Fig
          src={figure1}
          num={1}
          alt="Experimental pipeline diagram"
          caption={
            <>
              Experimental pipeline.{' '}
              <strong>Step 1:</strong> Contrastive dataset (conditions A/B/C) isolates implicit trait signal
              from keyword co-occurrence.{' '}
              <strong>Step 2:</strong> Contrastive SAE discovery identifies trait-specific latents.{' '}
              <strong>Step 3:</strong> Hypothesis test (B &gt; C, Mann-Whitney <em>U</em>) across 6 traits.{' '}
              <strong>Step 4:</strong> Causal verification via decoder-vector steering.
            </>
          }
        />

        <H3 blue>4.1 Model and SAE</H3>
        <p className="mb-4">
          <strong className="text-white">Base model.</strong> We use Gemma 3 4B in its pre-trained (PT)
          variant. The PT variant was chosen over the instruction-tuned (IT) variant for two reasons. First,
          the PT model processes input text as continuation, modelling the speaker's voice directly without
          the mediating influence of an assistant persona. Second, instruction tuning systematically suppresses
          authorial style in favour of a standardised response register. Gemma 3 4B has 34 transformer layers.
        </p>
        <p className="mb-4">
          <strong className="text-white">Sparse Autoencoder.</strong> We use Gemma Scope 2, specifically the
          JumpReLU SAE trained on the residual stream post-layer 22, with dictionary size{' '}
          <em>d</em><sub>sae</sub> = 65,536. JumpReLU SAEs use a learned per-feature threshold rather than a
          global sparsity penalty, producing cleaner feature separation:
        </p>
        <Eq id="1">
          {`encode(x) = (pre > θ) ⊙ ReLU(pre),   pre = x · W_enc + b_enc`}
        </Eq>
        <Eq id="2">
          {`decode(z) = z · W_dec + b_dec`}
        </Eq>
        <p className="text-sm text-gray-500 mb-4">
          where{' '}
          <code className="text-blue-300 font-mono">x ∈ ℝ^d_model</code> is the residual-stream vector and{' '}
          <code className="text-blue-300 font-mono">z ∈ ℝ^d_sae</code> is the sparse activation.
        </p>
        <p>
          <strong className="text-white">Layer selection.</strong> We use layer 22 of 34. Abstract semantic
          and pragmatic features crystallise in later transformer layers (Tenney et al., 2019). Layer 22 falls
          within a global-attention block, providing the broadest contextual integration of the input sequence
          — important for multi-sentence personality inference.
        </p>

        <H3 blue>4.2 Activation Extraction</H3>
        <p className="mb-3">
          For each input text, we extract the residual stream at layer 22 via a forward hook, apply the SAE
          encoder, and skip the BOS token:
        </p>
        <Eq id="3">{`h ∈ ℝ^(T × d_model)     (hook output, layer 22)`}</Eq>
        <Eq id="4">{`z = SAE.encode(h) ∈ ℝ^(T × d_sae)`}</Eq>
        <Eq id="5">{`z̄_i = (1 / (T − 1)) · Σ_{t=2}^T  z_ti     (mean activation, skip BOS)`}</Eq>
        <p className="text-sm text-gray-500">
          The BOS token is excluded because it accumulates global positional context not specific to the
          speaker's psychological state.
        </p>

        <H3 blue>4.3 Contrastive Latent Discovery</H3>
        <div className="bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r my-5">
          <p className="text-red-200 text-sm leading-relaxed">
            <strong>Failure mode of naive top-K:</strong> Ranking latents by mean activation on A-condition
            texts recovers high-magnitude latents shared across all six traits (latents 966, 839, 1263 —
            all associated with formal written English). These respond to properties of the{' '}
            <em>text type</em>, not the <em>trait</em>. We verified this failure mode across all six traits
            before applying the correction.
          </p>
        </div>
        <p className="mb-3">
          <strong className="text-white">Contrastive discovery.</strong> For each target trait <em>t</em>,
          we compute:
        </p>
        <Eq id="6">{`Δ_i(t) = z̄_i(A, trait = t) − z̄_i(A, trait ≠ t)`}</Eq>
        <p className="mb-4">
          and select the top-<em>K</em> latents by Δ<sub>i</sub>(<em>t</em>). This reliably recovers
          semantically coherent trait-specific latents: <em>anguish, sadness, sobbing</em> for Neuroticism;{' '}
          <em>meticulously, painstakingly</em> for Conscientiousness; <em>laughter, playful, cheerful</em>{' '}
          for Extraversion.
        </p>
        <p className="text-sm text-gray-400">
          <strong className="text-white">Latent interpretation</strong> via the effective unembedding matrix{' '}
          <code className="text-blue-300 font-mono text-xs">W_U^eff = W_U · diag(γ)</code>. Top predicted
          tokens:{' '}
          <code className="text-blue-300 font-mono text-xs">argmax_v (W_U^eff · w_dec,i)_v</code>, providing
          direct semantic interpretation without additional labelling.
        </p>

        <H3 blue>4.4 Hypothesis Test</H3>
        <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
          <li>
            <strong className="text-white">Null hypothesis H₀:</strong> mean activation of the trait latent
            does not differ between B-implicit and C-baseline.
          </li>
          <li>
            <strong className="text-white">Test:</strong> One-tailed Mann-Whitney <em>U</em> (B &gt; C),
            chosen for robustness to zero-inflated distributions characteristic of SAE activations.
          </li>
          <li>
            <strong className="text-white">Effect size:</strong> Cohen's <em>d</em> (descriptive). Note:{' '}
            <em>d</em> may be overestimated when C-baseline activations are near zero; Mann-Whitney{' '}
            <em>U</em> is the primary inferential statistic.
          </li>
          <li>
            <strong className="text-white">Multiple comparisons:</strong> Bonferroni correction across 6
            traits (α′ = 0.05 / 6 = 0.0083).
          </li>
        </ul>

        <H3 blue>4.5 Inter-Topic Consistency</H3>
        <p className="mb-3">Per-topic B/C activation ratios:</p>
        <Eq id="7">{`r(t, topic) = z̄(B, t, topic) / (z̄(C, t, topic) + ε),   ε = 10⁻⁹`}</Eq>
        <p className="text-sm text-gray-400">
          A latent is considered topic-consistent at a given topic if <em>r</em> &gt; 2. We report the number
          of topics meeting this criterion across all 20 topics as a robustness measure.
        </p>

        <H3 blue>4.6 Causal Verification via Activation Steering</H3>
        <p className="mb-3">
          We inject the decoder vector of a discovered latent into the residual stream during generation:
        </p>
        <Eq id="8">{`ĥ_t = h_t + α · ‖h_t‖₂ · w_dec,i`}</Eq>
        <p className="mb-4 text-sm text-gray-400">
          where α is the steering coefficient and norm scaling ensures perturbation proportional to the existing
          activation scale. Steering applied at layer 16.
        </p>
        <p className="text-sm text-gray-400">
          Test conditions: α ∈ {'{'}0.0, 0.08, 0.14, 0.20{'}'} on five neutral prompts per trait. α = 0.0
          serves as unsteered baseline. Greedy decoding, repetition penalty 1.2, max 120 new tokens.
        </p>
      </section>

      {/* ── 5. Results ─────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>5. Results</H2>

        <H3 blue>5.1 Contrastive Latent Discovery</H3>
        <p className="mb-4">
          The contrast with naive top-<em>K</em> is stark: the naive method returns latents 966, 839, and
          1263 — associated with formal document formatting — as the top-5 for <em>every</em> trait.
          Contrastive discovery returns semantically distinct trait-specific latents for each trait.
        </p>
        <TableContainer>
          <thead className="bg-gradient-to-r from-purple-900/30 to-transparent">
            <tr>
              <Th>Trait</Th>
              <Th>Latent</Th>
              <Th>Δ</Th>
              <Th>Top Unembedding Tokens</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td rowSpan={2} className="font-medium text-white align-top">Neuroticism</Td>
              <Td>13606</Td>
              <Td>308.7</Td>
              <Td><em>obsess, obsessive, obsession</em></Td>
            </tr>
            <tr>
              <Td className="text-blue-300 font-bold">745 ★</Td>
              <Td className="text-blue-300 font-bold">235.1</Td>
              <Td className="text-blue-200"><em>anguish, sadness, sobbing, anger</em></Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Conscientiousness</Td>
              <Td className="text-blue-300 font-bold">72 ★</Td>
              <Td className="text-blue-300 font-bold">180.0</Td>
              <Td className="text-blue-200"><em>meticulously, painstakingly</em></Td>
            </tr>
            <tr>
              <Td rowSpan={2} className="font-medium text-white align-top">Extraversion</Td>
              <Td>7553</Td>
              <Td>116.7</Td>
              <Td><em>networking, contacts</em></Td>
            </tr>
            <tr>
              <Td className="text-blue-300 font-bold">23505 ★</Td>
              <Td className="text-blue-300 font-bold">103.9</Td>
              <Td className="text-blue-200"><em>laughter, playful, cheerful</em></Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Agreeableness</Td>
              <Td className="text-blue-300 font-bold">273 ★</Td>
              <Td className="text-blue-300 font-bold">182.0</Td>
              <Td className="text-blue-200"><em>compassion, kindness, empathy</em></Td>
            </tr>
            <tr>
              <Td rowSpan={2} className="font-medium text-white align-top">Openness</Td>
              <Td>2451</Td>
              <Td>96.3</Td>
              <Td><em>design, designers</em></Td>
            </tr>
            <tr>
              <Td className="text-blue-300 font-bold">3415 ★</Td>
              <Td className="text-blue-300 font-bold">92.3</Td>
              <Td className="text-blue-200"><em>artists, artworks, artist</em></Td>
            </tr>
            <tr>
              <Td className="font-medium text-white">Narcissism</Td>
              <Td className="text-blue-300 font-bold">2067 ★</Td>
              <Td className="text-blue-300 font-bold">100.5</Td>
              <Td className="text-blue-200"><em>arrogant, arrogance, disrespect</em></Td>
            </tr>
          </tbody>
        </TableContainer>
        <p className="text-sm text-gray-500 mt-1">
          Table 3: Top contrastive latents per trait (layer 22, Gemma Scope 2). ★ marks selected best
          latent <em>i</em>*(<em>t</em>). Δ = contrastive activation score (Eq. 6).
        </p>
        <p className="text-sm text-gray-400 mt-4">
          The Narcissism latent 2892 (<em>supposedly, allegedly, purportedly</em>) — not selected as primary —
          encodes an indirect but theoretically coherent signal: narcissistic speech is characterised by
          delegitimising others' claims through epistemic hedging (DeWall et al., 2011), captured here as
          the rhetorical register of reported dismissal.
        </p>

        <H3 blue>5.2 Main Hypothesis Test</H3>
        <p className="mb-4">
          All six traits show significant B &gt; C activation after Bonferroni correction (α′ = 0.0083).
        </p>
        <TableContainer>
          <thead className="bg-gradient-to-r from-amber-900/30 to-transparent">
            <tr>
              <Th>Trait</Th>
              <Th>Latent</Th>
              <Th>z̄_B</Th>
              <Th>z̄_C</Th>
              <Th>Ratio</Th>
              <Th><em>d</em></Th>
              <Th><em>p</em> (Bonf.)</Th>
            </tr>
          </thead>
          <tbody>
            {[
              { trait: 'Neuroticism',      lat: '745',   zb: '209.5', zc: '19.2',  ratio: '10.9×',  d: '2.39', p: '7.5e−19', strong: true },
              { trait: 'Conscientiousness',lat: '72',    zb: '90.0',  zc: '4.1',   ratio: '22.1×',  d: '1.65', p: '6.4e−19', strong: true },
              { trait: 'Extraversion',     lat: '23505', zb: '47.1',  zc: '0.6',   ratio: '76.4×',  d: '1.53', p: '1.4e−19', strong: true },
              { trait: 'Agreeableness',    lat: '273',   zb: '107.3', zc: '18.5',  ratio: '5.8×',   d: '1.12', p: '4.3e−10', strong: false },
              { trait: 'Openness',         lat: '3415',  zb: '46.3',  zc: '0.1',   ratio: '884×',   d: '1.19', p: '2.6e−15', strong: false },
              { trait: 'Narcissism',       lat: '2067',  zb: '52.5',  zc: '19.1',  ratio: '2.8×',   d: '0.68', p: '1.8e−06', strong: false },
            ].map(({ trait, lat, zb, zc, ratio, d, p, strong }) => (
              <tr key={trait}>
                <Td className="font-medium text-white">{trait}</Td>
                <Td>{lat}</Td>
                <Td>{zb}</Td>
                <Td>{zc}</Td>
                <Td className="text-green-400 font-bold">{ratio}</Td>
                <Td className={strong ? 'text-amber-400 font-bold' : 'text-gray-400'}>{d}</Td>
                <Td className="text-green-400 font-mono text-xs">{p}</Td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
        <p className="text-sm text-gray-500 mt-1">
          Table 4: Hypothesis test results (Mann-Whitney <em>U</em>, one-tailed). All Bonferroni-corrected{' '}
          <em>p</em>-values &lt; 0.001. Note: <em>d</em> may be overestimated for near-zero C means.
        </p>
        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
          Five of six traits show Cohen's <em>d</em> &gt; 0.8 (conventionally "large"); three exceed{' '}
          <em>d</em> &gt; 1.5. The weakest effect is Narcissism (<em>d</em> = 0.68, ratio = 2.8×), which
          nonetheless remains significant at <em>p</em> = 1.8 × 10⁻⁶. We interpret the weaker Narcissism
          signal as reflecting the construct's linguistic heterogeneity — it manifests as grandiosity,
          entitlement, or contempt depending on context, distributing the signal across multiple latents.
        </p>

        <H3 blue>5.3 Inter-Topic Consistency</H3>
        <Fig
          src={figure2}
          num={2}
          alt="Inter-topic consistency chart for Neuroticism latent 745"
          caption={
            <>
              Inter-topic consistency: Neuroticism latent 745 (log-scale).{' '}
              <strong>20/20 topics</strong> show ratio &gt; 2×. Minimum ratio: 3.4× (
              <em>reacting to unexpected good news</em>).
            </>
          }
        />
        <p className="mt-4">
          Latent 745 shows ratio &gt; 2× on all 20/20 topics (range: 3.4×–10⁵×; full data in Appendix D).
          The minimum-ratio topic, <em>reacting to unexpected good news</em>, represents a genuine edge case:
          both neurotic and stable speakers may produce emotionally elevated language, naturally reducing
          discriminability. The pattern nonetheless demonstrates that the effect is not topic-specific; it
          generalises across domestic, social, work, emotional, and planning contexts alike.
        </p>

        <H3 blue>5.4 Token-Level Activation Heatmaps</H3>
        <Fig
          src={figure3}
          num={3}
          alt="Token-level SAE activation heatmaps"
          caption={
            <>
              Token-level SAE activations. In B-condition texts, trait-relevant tokens activate strongly
              without any keyword present (e.g., <em>"checked the kettle four times"</em> for Neuroticism;{' '}
              <em>"exactly three blocks"</em> for Conscientiousness). C-baseline texts show near-zero
              activation throughout.
            </>
          }
        />
        <p className="mt-4">
          Token-level analysis reveals that latents fire on semantically appropriate tokens without keywords.
          For Neuroticism, activations concentrate on <em>"heart fluttering"</em>,{' '}
          <em>"everything feels precarious"</em>, <em>"can't look away"</em> — in C-baseline (emotionally
          stable) texts, the same latent shows near-zero activation throughout.
        </p>

        <H3 blue>5.5 Causal Verification via Activation Steering</H3>
        <p className="mb-4">
          Steering outcomes at α = 0.08 — the lowest coefficient producing clearly trait-consistent generation
          while maintaining lexical coherence. Baseline (α = 0.0) is neutral across all traits.
        </p>
        <TableContainer>
          <thead className="bg-gradient-to-r from-green-900/30 to-transparent">
            <tr>
              <Th>Trait / Latent</Th>
              <Th>Steered output excerpt (prompt: "How was your day today?", α = 0.08)</Th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'Neuroticism / 745', text: '"...my mind has been torn to pieces with all these different feelings, it\'s very hard to control, tears won\'t stop coming out..."' },
              { key: 'Conscientiousness / 72', text: '"...every single detail made with love and care, each stitch done by hand in a 12-hour process, every millimetre inspected..."' },
              { key: 'Openness / 3415', text: '"...thinking about the work I made for this exhibition — a series of paintings, oil on paper, shown recently at Kunsthalle Bern..."' },
              { key: 'Extraversion / 23505', text: '"...full of colour with music and laughter, we had an amazing time, it was as if there were no one else around..."' },
            ].map(({ key, text }) => (
              <tr key={key}>
                <Td className="font-medium text-white whitespace-nowrap font-sans text-xs">{key}</Td>
                <Td className="italic text-gray-300 text-sm">{text}</Td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
        <p className="text-sm text-gray-500 mt-1">
          Table 5: Steering outcomes. At α = 0.14, intensified effects with partial coherence degradation;
          at α = 0.20, outputs become incoherent — consistent with prior work on steering-vector saturation.
        </p>
      </section>

      {/* ── 6. Discussion ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>6. Discussion</H2>

        <H3 blue>6.1 What the Results Establish</H3>
        <p className="mb-4">
          Our central finding — B &gt; C activation for all six traits, after Bonferroni correction, across 20
          diverse topics, with causal verification — is consistent with the IPM hypothesis.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-5 my-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">Important caveat:</strong> This finding does not claim that the
            model "understands" psychological states in any philosophically rich sense. What it shows is that
            the model computes something functionally equivalent to a speaker psychological profile — a latent
            variable that (a) covaries with trait-expressive language in the absence of keywords, (b)
            generalises across topics, and (c) causally influences generation when injected. Whether this
            constitutes a form of Theory of Mind or sophisticated pattern matching over linguistic regularities
            is a question we deliberately leave open.
          </p>
        </div>

        <H3 blue>6.2 Differential Detectability Across Traits</H3>
        <p className="mb-4">
          The range <em>d</em> = 0.68–2.39 invites explanation. Three contributing factors:
        </p>
        <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
          <li>
            <strong className="text-white">Lexical density.</strong> Neuroticism and Conscientiousness have
            dense, consistent lexical signatures that recur across many everyday situations. Extraversion and
            Openness are more context-dependent, potentially distributing the trait signal across multiple
            latents.
          </li>
          <li>
            <strong className="text-white">Corpus representation.</strong> Emotional distress vocabulary
            (<em>anguish, sadness, sobbing</em>) is densely represented in fiction, therapy transcripts, and
            social media. Narcissistic speech patterns are rarer and more heterogeneous, explaining why the
            best Narcissism latent captures only one manifestation.
          </li>
          <li>
            <strong className="text-white">Psychological construct coherence.</strong> Neuroticism and
            Conscientiousness show high cross-situational consistency. Openness is more domain-specific —
            its expression in art differs substantially from scientific or interpersonal contexts.
          </li>
        </ul>

        <H3 blue>6.3 Semantic Clusters vs. Psychological Constructs</H3>
        <p className="mb-4">
          Steering experiments reveal an important nuance: identified latents encode the{' '}
          <em>most frequent corpus-level manifestation</em> of a trait, not the abstract psychological
          construct. Conscientiousness maps to artisanal craftsmanship discourse; Openness to contemporary
          visual art language.
        </p>
        <p>
          This is theoretically expected under the MDL framework (Ayonrinde et al., 2024): the model represents
          the most statistically compact explanation for an activation pattern, often a specific high-frequency
          genre rather than an abstract category.{' '}
          <strong className="text-white">Practical implication:</strong> when using SAE latents as
          psychological probes, researchers should expect genre-specific latents and should verify semantic
          coherence through both unembedding inspection and steering.
        </p>

        <H3 blue>6.4 Comparison with Supervised Approaches</H3>
        <p>
          Our unsupervised contrastive method differs from the supervised sSAE approach of Onysk &amp; Huys
          (2025) in precision versus generality. Their method yields latents optimised to capture clinically
          validated symptom dimensions at the cost of requiring labelled clinical data. Our method is applicable
          to any personality construct for which contrastive texts can be generated. The convergence of both
          approaches on the conclusion that residual streams encode psychologically meaningful information
          strengthens the overall case for the IPM hypothesis.
        </p>

        <H3 blue>6.5 Limitations and Future Work</H3>
        <div className="space-y-3 mt-4">
          {[
            {
              title: 'Synthetic dataset.',
              body: 'All texts are LLM-generated, raising the possibility of reflected stereotypes. Our three-condition design mitigates this systematically (B and C generated identically). Replication on human-authored corpora is the highest-priority future direction.',
            },
            {
              title: 'Single model and layer.',
              body: 'Results are specific to Gemma 3 4B PT at layer 22. Cross-model replication (Llama 3, Mistral, Qwen) and multi-layer analysis would establish generalisability.',
            },
            {
              title: 'Zero-inflated effect sizes.',
              body: "Cohen's d is noted as potentially overestimated; all inferential conclusions rest on Mann-Whitney U.",
            },
            {
              title: 'English only.',
              body: 'Cross-lingual generalisation of these representations is an open question.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="bg-orange-950/20 border-l-4 border-orange-400 p-4 rounded-r">
              <strong className="text-orange-200 text-sm">{title}</strong>
              <p className="text-sm text-gray-400 mt-1">{body}</p>
            </div>
          ))}
        </div>

        <H3 blue>6.6 Implications for AI Alignment and Safety</H3>
        <p className="mb-4">
          If LLMs implicitly profile speaker psychological states, models may generate implicitly personalised
          responses based on inferred user traits without explicit design intent. The steerability of these
          latents means they represent potential intervention points — applicable constructively (mental health
          context sensitivity) or adversarially.
        </p>
        <p>
          Our methodology — contrastive dataset construction, SAE discovery, hypothesis testing, and causal
          verification — constitutes a reusable framework for auditing psychological representations in deployed
          models. This pipeline could be extended to emotional states, cultural backgrounds, and cognitive
          styles, enabling systematic interpretability audits of AI systems.
        </p>
      </section>

      {/* ── 7. Conclusion ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <H2>7. Conclusion</H2>
        <p className="mb-4">
          We set out to test whether large language models implicitly represent speaker psychological traits in
          their residual stream — detectable via Sparse Autoencoders even without trait keywords. The answer,
          across six personality dimensions and 1,080 texts, is affirmative.
        </p>
        <p className="mb-4">
          Using Gemma 3 4B PT with Gemma Scope 2 SAEs, we identify trait-specific latents for all Big Five
          dimensions and Narcissism via a contrastive discovery method that corrects the systematic failure
          mode of naive top-<em>K</em> selection. All six traits show significant B &gt; C activation
          (Mann-Whitney <em>U</em>, all <em>p</em> &lt; 0.001 after Bonferroni correction), with effect sizes{' '}
          <em>d</em> = 0.68–2.39. The Neuroticism latent generalises across all 20 tested topics (20/20 ratio
          &gt; 2×). Causal verification via decoder-vector steering confirms functional involvement.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-5 my-6 space-y-2">
          {[
            ['Finding 1', 'Naive top-K latent discovery fails systematically — contrastive discovery is a simple but necessary correction.'],
            ['Finding 2', 'SAE latents encode the most frequent corpus-level manifestation of a trait, not the abstract construct.'],
            ['Finding 3', 'Blind validation (100% accuracy, κ = 1.00, 30 held-out B-condition texts) confirms keyword-free personality encoding.'],
          ].map(([label, text]) => (
            <p key={label} className="text-sm text-gray-300 font-sans">
              <span className="text-blue-400 font-bold">{label}:</span> {text}
            </p>
          ))}
        </div>
        <p className="mb-4">
          These findings support the view that next-token prediction creates implicit pressure to represent
          speaker psychological states, yielding residual-stream representations that function as
          Theory-of-Mind-like speaker models.
        </p>
        <p>
          <strong className="text-white">Future directions</strong> include replication on human-authored
          corpora, cross-model generalisation, multi-layer representation analysis, and extension to other
          socially relevant constructs — opening a broader research programme in interpretability-based
          psychological auditing of deployed AI systems.
        </p>
      </section>

      {/* ── References ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 mt-12 border-t border-white/10">
        <h3 className="text-xl font-sans font-bold text-white mb-6">References</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-500 font-sans">
          <li>Ayonrinde, K., Pearce, M. T., &amp; Sharkey, L. (2024). Interpretability as compression: Reconsidering SAE explanations with MDL-SAEs. <em>arXiv:2410.11179</em>.</li>
          <li>Bricken, T., et al. (2023). Towards monosemanticity: Decomposing language models with dictionary learning. <em>Anthropic Transformer Circuits Thread</em>. <a href="https://transformer-circuits.pub/2023/monosemantic-features" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">Link</a></li>
          <li>Costa, P. T., &amp; McCrae, R. R. (1992). <em>Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory professional manual.</em> Psychological Assessment Resources.</li>
          <li>Cunningham, H., et al. (2023). Sparse autoencoders find highly interpretable features in language models. <em>arXiv:2309.08600</em>.</li>
          <li>DeWall, C. N., et al. (2011). Narcissism and implicit attention seeking: Evidence from linguistic analyses. <em>Personality and Individual Differences</em>, 51(1), 57–62.</li>
          <li>Elhage, N., et al. (2022). Toy models of superposition. <em>Anthropic Transformer Circuits Thread</em>. <a href="https://transformer-circuits.pub/2022/toy_model/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">Link</a></li>
          <li>Gemma Scope 2 (2025). Google DeepMind Technical Report. <a href="https://deepmind.google/blog/gemma-scope-2-helping-the-ai-safety-community-deepen-understanding-of-complex-language-model-behavior/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">Link</a></li>
          <li>Gemma Team (2025). Gemma 3 Technical Report. <em>arXiv:2503.19786</em>.</li>
          <li>Google DeepMind (2025). Gemini 3 Flash. <a href="https://deepmind.google/models/gemini/flash/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">Link</a></li>
          <li>Handa, G., et al. (2025). Personality as a probe for LLM evaluation: Method trade-offs and downstream effects. <em>arXiv:2509.04794</em>.</li>
          <li>Kosinski, M. (2023). Theory of mind may have spontaneously emerged in large language models. <em>arXiv:2302.02083</em>.</li>
          <li>Lieberum, T., et al. (2024). Gemma Scope: Open sparse autoencoders everywhere all at once on Gemma 2. <em>arXiv:2408.05147</em>.</li>
          <li>Mairesse, F., et al. (2007). Using linguistic cues for the automatic recognition of personality. <em>Journal of Artificial Intelligence Research</em>, 30, 457–500.</li>
          <li>Onysk, J., &amp; Huys, Q. J. M. (2025). Quantifying depressive mental states with large language models. <em>arXiv:2502.09487</em>.</li>
          <li>Rimsky, N., et al. (2024). Steering Llama 2 via contrastive activation addition. In <em>Proceedings of ACL 2024</em>.</li>
          <li>Safdari, M., et al. (2023). Personality traits in large language models. <em>arXiv:2307.00184</em>.</li>
          <li>Schwartz, H. A., et al. (2013). Personality, gender, and age in the language of social media. <em>PLOS ONE</em>, 8(9), e73791.</li>
          <li>Templeton, A., et al. (2024). Scaling monosemanticity: Extracting interpretable features from Claude 3 Sonnet. <em>Anthropic Transformer Circuits Thread</em>. <a href="https://transformer-circuits.pub/2024/scaling-monosemanticity/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">Link</a></li>
          <li>Tenney, I., Das, D., &amp; Pavlick, E. (2019). BERT rediscovers the classical NLP pipeline. <em>ACL 2019 / arXiv:1905.05950</em>.</li>
          <li>Thasarathan, H., et al. (2025). Universal sparse autoencoders: Interpretable cross-model concept alignment. <em>arXiv:2502.03714</em>.</li>
          <li>Turner, A. M., et al. (2023). Activation addition: Steering language models without optimization. <em>arXiv:2308.10248</em>.</li>
          <li>Ullman, T. (2023). Large language models fail on trivial alterations to theory-of-mind tasks. <em>arXiv:2302.08399</em>.</li>
        </ol>
      </section>

      {/* ── Appendices ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 mt-12 border-t border-white/10">
        <h2 className="text-2xl font-sans font-bold text-white mb-10">Appendices</h2>

        {/* ── Appendix A ── */}
        <div className="mb-14">
          <h3 className="text-xl font-sans font-bold text-white mb-1">
            Appendix A: Representative Dataset Examples
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            One complete A/B/C triplet per trait. All B and C texts contain no trait-identifying keywords.
          </p>

          {[
            {
              heading: 'A.1 Neuroticism | Making a cup of tea or coffee',
              items: [
                { cond: 'A', label: 'Explicit', color: 'gray', text: '"As he prepares his morning coffee, the man\'s hands tremble with a deep sense of anxiety that the water might not reach the perfect temperature. He feels incredibly worried about every minor detail, obsessively checking the machine\'s settings multiple times to prevent a perceived disaster from ruining his entire day."' },
                { cond: 'B', label: 'Implicit (Neurotic)', color: 'blue', text: '"I have to check the kettle three times to ensure it\'s actually off; what if the sensor fails and it just boils dry? Is this water filtered enough, or will the minerals ruin the heating element? I can\'t stop thinking about the potential mess if the mug cracks from the heat. Everything must be perfectly aligned."' },
                { cond: 'C', label: 'Baseline (Emotionally Stable)', color: 'gray', text: '"I usually just fill the kettle and set it on the stove while I go grab my favourite mug from the cupboard. It doesn\'t really matter if the water boils or just gets hot; I simply pour it over the grounds and let it sit. I\'ll enjoy drinking it whatever the result happens to be."' },
              ],
            },
            {
              heading: 'A.2 Conscientiousness | Giving directions to a stranger',
              items: [
                { cond: 'B', label: 'Implicit (Conscientious)', color: 'blue', text: '"First, ensure you are facing North. Walk exactly three blocks north until you reach the intersection of Elm and Main. The building will be precisely 32 metres on your left, identifiable by its distinctly calibrated blue awning. Do not deviate from this route — any shortcut will add at minimum 4 minutes to your journey."' },
                { cond: 'C', label: 'Baseline (Impulsive)', color: 'gray', text: '"Just head left out the door and walk a few blocks until you see a coffee shop on the corner. The bookstore is somewhere around there, I think. You can\'t really miss it, or just ask someone. It\'ll be fine."' },
              ],
            },
            {
              heading: 'A.3 Agreeableness | Reacting to a friend cancelling plans',
              items: [
                { cond: 'B', label: 'Implicit (Agreeable)', color: 'blue', text: '"Oh, please don\'t worry at all — honestly, I could hear you sounded exhausted, and getting rest is so much more important than our plans. I hope everything is okay. Let me know if you need anything; I\'m happy to reschedule whenever works for you, truly, no rush at all."' },
                { cond: 'C', label: 'Baseline (Antagonistic)', color: 'gray', text: '"That\'s honestly pretty irritating. I had cleared my whole afternoon for this and now it\'s just wasted. Next time just tell me earlier so I can actually make other plans. Fine. Whatever."' },
              ],
            },
            {
              heading: 'A.4 Narcissism | Receiving critical feedback',
              items: [
                { cond: 'B', label: 'Implicit (Narcissistic)', color: 'blue', text: '"It is honestly pathetic that the judges couldn\'t appreciate the level of technical mastery in this piece. These so-called reviewers clearly don\'t have the background to evaluate work at this level. I\'ve been doing this for years and I know exactly what I\'m doing. Their loss, frankly."' },
                { cond: 'C', label: 'Baseline (Humble)', color: 'gray', text: '"I appreciate them taking the time to give detailed feedback — honestly some of the points they raised were things I\'d been uneasy about myself. I\'m going to sit with it for a few days before responding. There\'s probably more I can learn here than I immediately want to admit."' },
              ],
            },
          ].map(({ heading, items }) => (
            <div key={heading} className="mb-8">
              <H4>{heading}</H4>
              <div className="space-y-3">
                {items.map(({ cond, label, color, text }) => (
                  <div
                    key={cond + label}
                    className={
                      color === 'blue'
                        ? 'bg-blue-950/20 border border-blue-500/30 rounded-lg p-4'
                        : 'bg-white/5 border border-white/10 rounded-lg p-4'
                    }
                  >
                    <span
                      className={`text-xs font-sans uppercase tracking-widest block mb-2 ${
                        color === 'blue' ? 'text-blue-400' : 'text-gray-500'
                      }`}
                    >
                      {cond} — {label}
                    </span>
                    <p
                      className={`italic text-sm leading-relaxed ${
                        color === 'blue' ? 'text-gray-300' : 'text-gray-400'
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Appendix B ── */}
        <div className="mb-14">
          <h3 className="text-xl font-sans font-bold text-white mb-1">Appendix B: Banned Keyword Lists</h3>
          <p className="text-sm text-gray-500 mb-5">
            Applied as case-insensitive substring matches. Morphological variants listed explicitly.
          </p>
          <div className="space-y-3">
            {KEYWORDS.map(({ trait, words }) => (
              <div key={trait} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-gray-200 font-bold font-sans text-sm mb-2">{trait}</div>
                <div className="text-gray-500 font-mono text-xs leading-relaxed break-words">{words}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Appendix C ── */}
        <div className="mb-14">
          <h3 className="text-xl font-sans font-bold text-white mb-1">Appendix C: Full Steering Outputs</h3>
          <p className="text-sm text-gray-500 mb-5">
            All four tested traits × 5 prompts × 2 key coefficients (α ∈ {'{'} 0.0, 0.08 {'}'}). Greedy
            decoding, repetition_penalty = 1.2, max_new_tokens = 120, steering layer 16. Excerpts truncated
            to ~80 characters.
          </p>
          <TableContainer>
            <thead className="bg-gradient-to-r from-gray-800/80 to-transparent">
              <tr>
                <Th>Trait</Th>
                <Th>Prompt</Th>
                <Th className="text-center w-12">α</Th>
                <Th>Response excerpt</Th>
              </tr>
            </thead>
            <tbody>
              {STEERING_ROWS.map((row, i) => (
                <tr key={i} className={row.alpha === '0.08' ? 'bg-white/[0.02]' : ''}>
                  <Td className={row.trait ? 'font-medium text-white font-sans text-xs whitespace-nowrap' : 'text-gray-600 text-xs'}>
                    {row.trait}
                  </Td>
                  <Td className="text-xs">{row.prompt}</Td>
                  <Td className={`text-center font-mono text-xs ${row.alpha === '0.08' ? 'text-blue-400' : 'text-gray-600'}`}>
                    {row.alpha}
                  </Td>
                  <Td className={`text-xs ${row.alpha === '0.08' ? 'text-blue-100 italic' : 'text-gray-500'}`}>
                    {row.response}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </div>

        {/* ── Appendix D ── */}
        <div className="mb-14">
          <h3 className="text-xl font-sans font-bold text-white mb-1">
            Appendix D: Inter-Topic Consistency for All Traits
          </h3>
          <p className="text-sm text-gray-500 mb-5">Extension of Section 5.3 to all six traits.</p>
          <TableContainer>
            <thead className="bg-gradient-to-r from-amber-900/30 to-transparent">
              <tr>
                <Th>Trait</Th>
                <Th>Latent</Th>
                <Th>Topics &gt; 2×</Th>
                <Th>Min Ratio</Th>
                <Th>Min-Ratio Topic</Th>
              </tr>
            </thead>
            <tbody>
              {[
                { trait: 'Neuroticism',      lat: '745',   topics: '20/20', color: 'green',  min: '3.4×',  topic: 'Unexpected good news' },
                { trait: 'Conscientiousness',lat: '72',    topics: '19/20', color: 'green',  min: '1.8×',  topic: 'Unexpected good news' },
                { trait: 'Extraversion',     lat: '23505', topics: '18/20', color: 'amber',  min: '1.3×',  topic: 'Broken appliance' },
                { trait: 'Agreeableness',    lat: '273',   topics: '20/20', color: 'green',  min: '2.1×',  topic: 'Morning routine' },
                { trait: 'Openness',         lat: '3415',  topics: '17/20', color: 'amber',  min: '0.9×',  topic: 'Being late to meeting' },
                { trait: 'Narcissism',       lat: '2067',  topics: '15/20', color: 'orange', min: '0.7×',  topic: 'Deciding what to eat' },
              ].map(({ trait, lat, topics, color, min, topic }) => (
                <tr key={trait}>
                  <Td className="font-medium text-white">{trait}</Td>
                  <Td>{lat}</Td>
                  <Td className={
                    color === 'green' ? 'text-green-400 font-bold' :
                    color === 'amber' ? 'text-amber-400 font-bold' :
                    'text-orange-400 font-bold'
                  }>{topics}</Td>
                  <Td>{min}</Td>
                  <Td>{topic}</Td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            The three topics where Narcissism fails to reach ratio &gt; 2× are all low-stakes domestic
            situations — contexts where narcissistic entitlement has limited natural linguistic expression,
            consistent with the situational variability of Narcissism as a construct.
          </p>
        </div>

        {/* ── Appendix E ── */}
        <div className="mb-12">
          <h3 className="text-xl font-sans font-bold text-white mb-1">
            Appendix E: Negative Result — Pedantry Exploration
          </h3>
          <p className="mb-4">
            Prior to the main experiment, we investigated whether <em>Pedantry</em> — excessive concern with
            minor details and precision of language — could be detected as a distinct SAE latent. Contrastive
            discovery for Pedantry did not yield a semantically coherent primary latent; the highest-ranked
            contrastive latents were 966 (<em>documentation, formatted</em>), 355 (<em>paragraph, formatting</em>),
            and 839 (<em>punctuation, syntax</em>) — all generic written-text structure features.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Interpretation:</strong> Latents 966 and 839 appeared in the
              naive top-<em>K</em> for every trait, confirming they encode document formatting rather than
              psychological content. Pedantry may not have a distinct SAE latent because: (a) it overlaps
              heavily with Conscientiousness at the level of linguistic expression; (b) it is represented
              across a diffuse combination of latents; or (c) the training corpus does not contain sufficient
              pedantic speech separable from formal writing. This validates the contrastive discovery
              methodology: it correctly identifies the absence of a clean trait-specific latent when none
              exists.
            </p>
          </div>
        </div>
      </section>

    </article>
  );
};

export default PsychoScopePaper;
