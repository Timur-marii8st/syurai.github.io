import React from 'react';

// Общие стили для таблиц, чтобы не дублировать классы
const TableContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto my-6 border border-white/10 rounded-lg">
    <table className="w-full text-left text-sm border-collapse bg-white/5">
      {children}
    </table>
  </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="p-4 border-b border-white/10 font-bold text-gray-200">{children}</th>
);

const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`p-4 border-b border-white/5 text-gray-400 ${className}`}>{children}</td>
);

const PsychProfilingPaper: React.FC = () => {
  return (
    <article className="font-serif leading-relaxed text-gray-300 max-w-none">
      
      {/* Abstract */}
      <div className="bg-white/5 border-l-4 border-blue-500 p-6 rounded-r-lg my-10 shadow-lg backdrop-blur-sm">
        <h3 className="text-white font-sans font-bold uppercase text-xs tracking-widest mb-3 opacity-70">Abstract</h3>
        <p className="italic text-gray-300 text-lg leading-8">
          This paper investigates the capability of Large Language Models (LLMs) to infer an author's psychological characteristics—specifically Myers-Briggs Type Indicator (MBTI) types, Big Five traits, and gender—based solely on text analysis in a zero-shot setting. Experiments were conducted across three distinct tiers of model complexity: local quantized models, high-performance cloud models (DeepSeek V3.2), and next-generation state-of-the-art models (Google Gemini 3.0 Pro). Our results demonstrate a pronounced scaling effect: while smaller models perform at the level of random guessing, SOTA models achieve 74% accuracy in determining MBTI types and 98% accuracy on the Introversion/Extraversion scale within a pilot sample. These findings support the Linear Representation Hypothesis regarding psychological features in LLM hidden states and raise significant privacy concerns regarding the potential for non-consensual profiling in the era of advanced AI.
        </p>
      </div>

      {/* 1. Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">1. Introduction</h2>
        <p className="mb-6">
          Modern Large Language Models (LLMs) demonstrate capabilities that extend far beyond syntactic text analysis. Increasingly, the discussion in the field focuses on their emergent ability to model elements of <em>Theory of Mind</em> [1]—understanding human intentions, emotional states, and personality traits.
        </p>
        <p>
          Traditional psychometric methods rely on extensive questionnaires. However, a user's digital footprint (e.g., social media posts, essays) contains implicit patterns that correlate with their psychological profile. The objective of this research is to determine whether modern LLMs can serve as an instrument of "computational psychometrics" in a zero-shot mode (without fine-tuning), and to quantify how architectural complexity affects the accuracy of such predictions.
        </p>
      </section>

      {/* 2. Theoretical Justification */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">2. Theoretical Justification</h2>
        <p className="mb-6">
          Our hypothesis is grounded in the <em>Linear Representation Hypothesis</em> [2]. We posit that the psychological characteristics of an author are encoded within the model's hidden states during the pre-training stage.
        </p>
        <ul className="list-disc pl-6 space-y-4 marker:text-blue-500">
          <li>
            <strong className="text-white block mb-1">Hidden States and Attention</strong>
            When generating the next token, the model incorporates context via the Self-Attention mechanism [3]. Statistically, an introvert is more likely to employ specific lexical constructions and sentence structures compared to an extrovert.
          </li>
          <li>
            <strong className="text-white block mb-1">Latent Space</strong>
            These statistical regularities are mapped into the model's multidimensional vector space. A personality trait (e.g., "Extraversion") can be conceptualized as a direction vector within this space.
          </li>
          <li>
            <strong className="text-white block mb-1">Extractability</strong>
            Recent research indicates that linear classifiers trained on hidden states can distinguish texts written by authors with differing Big Five traits [4]. Therefore, a sufficiently powerful model should be capable of "verbalizing" this latent knowledge through direct prompting.
          </li>
        </ul>
      </section>

      {/* 3. Methodology */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">3. Methodology</h2>
        <p className="mb-6">To test this hypothesis, a series of experiments was conducted using three datasets across three classes of models.</p>
        
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4 text-blue-300">3.1 Datasets</h3>
        <ol className="list-decimal pl-6 space-y-3 marker:text-gray-500 marker:font-bold">
          <li><strong>MBTI Dataset</strong> [5]: Sourced from Kaggle, containing user posts with verified personality types (16 classes). A sample size of <em>N=800</em> was utilized.</li>
          <li><strong>Essays Big5</strong> [6]: A corpus of essays annotated with Big Five (OCEAN) traits. Sample size: <em>N=800</em>.</li>
          <li><strong>Personae Corpus</strong> [7]: A dataset annotated with gender and MBTI types. The full available sample of <em>N=145</em> was used.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 bg-white/5 p-4 rounded">
           For the primary experiments involving DeepSeek and Qwen models, a stratified sample of <em>N=800</em> was constructed. Statistical power analysis indicates that for a population of this magnitude, the sample provides a 95% confidence interval with a margin of error of approximately ±3.5%.
        </p>

        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4 text-blue-300">3.2 Models</h3>
        <p className="mb-4">Model selection was based on performance in MMLU [8] and MMLU-Pro [9] benchmarks.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                <div className="text-xs font-sans uppercase tracking-widest text-gray-500 mb-2">Level 1</div>
                <div className="font-bold text-white text-lg">Low Resource</div>
                <div className="text-sm mt-2 text-gray-400">Qwen 3 8B [10], Apriel-1.5-15b [11] (Quantized 4-bit)</div>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <div className="text-xs font-sans uppercase tracking-widest text-blue-400 mb-2">Level 2</div>
                <div className="font-bold text-white text-lg">Strong Baseline</div>
                <div className="text-sm mt-2 text-gray-400">DeepSeek V3.2 [13] (API)</div>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <div className="text-xs font-sans uppercase tracking-widest text-purple-400 mb-2">Level 3</div>
                <div className="font-bold text-white text-lg">State-of-the-Art</div>
                <div className="text-sm mt-2 text-gray-400">Google Gemini 3.0 Pro [14]</div>
            </div>
        </div>
      </section>

      {/* 4. Experimental Results */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">4. Experimental Results</h2>

        {/* Stage 1 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.1 Stage 1: Local Quantized Models</h3>
        <p className="mb-6">
            Experiments with local models (Qwen, Llava) demonstrated their unsuitability for zero-shot psychometrics. Accuracy for MBTI determination was approximately <strong>6%</strong> (comparable to random noise), and Big5 metrics showed no significant correlation (F1-score ≈ 0). We conclude that severe quantization and insufficient parameter count deprive these models of the "reasoning" capacity required for stylistic analysis.
        </p>

        {/* Stage 2 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.2 Stage 2: DeepSeek V3.2 (N=800)</h3>
        <p className="mb-4">The "Strong Baseline" model demonstrated a significant improvement over random guessing.</p>
        
        <TableContainer>
            <thead>
                <tr>
                    <Th>Metric</Th>
                    <Th>Value</Th>
                    <Th>Note</Th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Td className="font-medium text-white">Exact Match Accuracy</Td>
                    <Td className="text-blue-400 font-bold">52.50%</Td>
                    <Td> &gt;8x higher than random baseline (6.25%)</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (I)E (Introversion)</Td>
                    <Td>85.50%</Td>
                    <Td>High accuracy</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (N)S (Intuition)</Td>
                    <Td className="text-green-400 font-bold">91.00%</Td>
                    <Td>Phenomenal accuracy</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (T)F (Logic/Ethics)</Td>
                    <Td>76.62%</Td>
                    <Td>—</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (J)P (Rational/Irrational)</Td>
                    <Td>76.88%</Td>
                    <Td>—</Td>
                </tr>
            </tbody>
        </TableContainer>

        <p className="text-sm bg-red-900/10 border border-red-500/20 p-4 rounded text-red-200 mt-4">
            <strong>Gender Anomaly:</strong> On the Personae Dataset, gender determination accuracy was 32.41%. Given binary classification, a result significantly worse than random (50%) suggests a systematic error. We hypothesize this is due to <em>In-Context Priming Bias</em>: the example <code>{`{gender:female}`}</code> in the system prompt likely acted as a false few-shot signal.
        </p>

        {/* Stage 3 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.3 Stage 3: Gemini 3.0 Pro (N=50, Pilot Study)</h3>
        <p className="mb-4">Testing the SOTA model revealed a qualitative leap in performance.</p>

        <TableContainer>
            <thead className="bg-gradient-to-r from-purple-900/30 to-transparent">
                <tr>
                    <Th>Metric</Th>
                    <Th>Value</Th>
                    <Th>Δ vs DeepSeek</Th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Td className="font-medium text-white">Exact Match Accuracy</Td>
                    <Td className="text-purple-400 font-bold text-lg">74.00%</Td>
                    <Td className="text-green-400">+21.5%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (I)E</Td>
                    <Td className="text-purple-400 font-bold text-lg">98.00%</Td>
                    <Td className="text-green-400">+12.5%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (N)S</Td>
                    <Td>88.00%</Td>
                    <Td className="text-red-400">-3.0%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (T)F</Td>
                    <Td>88.00%</Td>
                    <Td className="text-green-400">+11.4%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (J)P</Td>
                    <Td>86.00%</Td>
                    <Td className="text-green-400">+9.1%</Td>
                </tr>
            </tbody>
        </TableContainer>
        
        <p className="text-sm text-gray-500 mt-4">
            <em>Limitations:</em> Due to API access restrictions, Gemini 3.0 Pro was validated as a pilot study. While the sample size (N=60) introduces a higher margin of error (±11.1%), the performance gap compared to DeepSeek is statistically significant.
        </p>
      </section>

      {/* 5. Discussion */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">5. Discussion</h2>
        
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">5.1 The Scaling Laws of Psychometrics</h3>
        <p className="mb-4">Our comparison reveals that the capability for psychological profiling is not linear; it is emergent.</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Small Models:</strong> Fail to detect patterns (0–6% accuracy).</li>
            <li><strong>Medium Models:</strong> Detect explicit patterns (52% accuracy), particularly lexical markers for Intuition (N) and Sensation (S).</li>
            <li><strong>SOTA Models:</strong> Achieve expert-level assessment (74% accuracy). The 98% accuracy on the Introversion/Extraversion scale suggests this specific sub-task is effectively solved for NLP.</li>
        </ul>

        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">5.2 Limitations and Ethics</h3>
        <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r">
            <p>
                The high accuracy of Gemini 3.0 Pro raises critical privacy questions. If a model can derive a comprehensive psychological profile with 74% accuracy from text alone, it enables highly targeted manipulation or discrimination without the user disclosing explicit personal data.
            </p>
        </div>
      </section>

      {/* 6. Conclusion */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">6. Conclusion</h2>
        <p className="mb-4">
            This study confirms that modern LLMs (DeepSeek V3 and above) can effectively solve psychometric tasks in zero-shot mode.
        </p>
        <p className="mb-4">
            <strong>Future Work:</strong> We plan to move beyond the "black box" approach by employing Mechanistic Interpretability methods. Specifically, we aim to use Probing Classifiers and Sparse Autoencoders to analyze model weights and identify specific directions in the latent space responsible for encoding psychological traits.
        </p>
        <p className="mt-8">
            <strong>Data Availability:</strong> The complete source code, prompts, and logs are available at: <a href="https://github.com/Timur-marii8st/LLM-ZeroShot-Psychometrics" className="text-blue-400 hover:text-blue-300 underline">GitHub Repository</a>
        </p>
      </section>

      {/* References */}
      <section className="pt-12 mt-12 border-t border-white/10">
        <h3 className="text-xl font-sans font-bold text-white mb-6">References</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-500 font-sans">
            <li>Premack, D., & Woodruff, G. (1978). Does the chimpanzee have a theory of mind? <em>Behavioral and Brain Sciences</em>.</li>
            <li>Park, K., et al. (2023). The Linear Representation Hypothesis and the Geometry of Large Language Models. <em>arXiv</em>.</li>
            <li>Vaswani, A., et al. (2017). Attention is all you need. <em>NIPS</em>.</li>
            <li>Ju, T., et al. (2025). Probing then Editing Response Personality of Large Language Models. <em>arXiv</em>.</li>
            <li>Kaggle. (2024). MBTI-type dataset. <a href="https://www.kaggle.com/datasets/datasnaek/mbti-type" className="hover:text-blue-400 underline">Link</a></li>
            <li>Jing Jie, Tan. (2024). essays-big5 Dataset. <em>Hugging Face</em>.</li>
            <li>Luyckx, K., & Daelemans, W. (2013). Personae corpus. <em>Zenodo</em>.</li>
            <li>Hendrycks, D., et al. (2020). Measuring massive multitask language understanding. <em>arXiv</em>.</li>
            <li>Wang, Y., et al. (2024). MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark.</li>
            <li>Qwen Team. (2025). Qwen3 Technical Report. <em>arXiv</em>.</li>
            <li>Apriel AI. (2025). Apriel-1.5-15B-Thinker. <em>arXiv</em>.</li>
            <li>Artificial Analysis. (2025). MMLU-Pro Benchmark.</li>
            <li>DeepSeek AI. (2025). DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models. <em>arXiv</em>.</li>
            <li>DeepMind. (2025). Gemini-3 Pro Model Card.</li>
        </ol>
      </section>

    </article>
  );
};

export default PsychProfilingPaper;