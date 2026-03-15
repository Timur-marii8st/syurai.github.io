import React from 'react';

// Общие стили для таблиц
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
          This study investigates the ability of Large Language Models (LLMs) to determine the psychological characteristics of an author (MBTI personality types, Big Five traits, gender) solely based on written text analysis without prior training (zero-shot). Experiments were conducted across three levels of models: local quantized models, high-performance cloud models (DeepSeek V3.2), and next-generation models (Google Gemini 3.0 Flash). The results demonstrate a pronounced scaling effect: while small models perform at the level of random guessing, the Gemini 3.0 Flash model achieves an accuracy of 71.88% in determining the full MBTI type (16 classes) and 94% on the Intuition/Sensing scale on the full sample (N=800). The work confirms the hypothesis of linear representation of psychological features within LLM hidden states but also reveals a significant dependence of accuracy on the text domain (the Domain Shift problem).
        </p>
      </div>

      {/* 1. Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">1. Introduction</h2>
        <p className="mb-6">
          Modern Large Language Models (LLMs) demonstrate capabilities far beyond syntactic text analysis. There is increasing discussion regarding their ability to model elements of <em>Theory of Mind</em> [1]—understanding human intentions, emotional states, and personality traits.
        </p>
        <p>
          Traditional psychometric methods require completing lengthy questionnaires. However, a user's digital footprint (social media posts, essays) contains implicit patterns correlated with their psychological portrait. The goal of this research is to determine whether modern LLMs can act as a tool for "computational psychometrics" in a zero-shot mode (without fine-tuning) and how the architectural complexity of the model affects the accuracy of such predictions.
        </p>
      </section>

      {/* 2. Theoretical Rationale */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">2. Theoretical Rationale</h2>
        <p className="mb-6">
          Our hypothesis is based on the <em>Linear Representation Hypothesis</em> [2]. We assume that an author's psychological features are encoded in the model's hidden states during the pre-training phase, and coding neurons can activate when processing user text even without an explicit prompt for psychological analysis.
        </p>
        <ul className="list-disc pl-6 space-y-4 marker:text-blue-500">
          <li>
            <strong className="text-white block mb-1">Hidden States and Attention</strong>
            When generating the next token, the model considers context through the Self-Attention mechanism [3]. If an author is an introvert, they statistically use specific lexical constructions more frequently.
          </li>
          <li>
            <strong className="text-white block mb-1">Extractability</strong>
            Research shows that personality traits can be represented as vectors in the model's multidimensional space [4]. Consequently, a sufficiently powerful model should be able to "verbalize" this latent knowledge through direct prompting.
          </li>
        </ul>
      </section>

      {/* 3. Methodology */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">3. Methodology</h2>
        
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4 text-blue-300">3.1 Datasets</h3>
        <ol className="list-decimal pl-6 space-y-3 marker:text-gray-500 marker:font-bold">
          <li><strong>MBTI Dataset</strong> [5]: User posts from the Kaggle platform. Sample N=800.</li>
          <li><strong>Essays Big5</strong> [6]: A corpus of essays labeled with "Big Five" traits. Sample N=800.</li>
          <li><strong>Personae Corpus</strong> [7]: A dataset with gender and MBTI labeling. Sample N=145.</li>
        </ol>

        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4 text-blue-300">3.2 Models</h3>
        <p className="mb-4">The study was conducted in three stages to compare the capabilities of models at different levels:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                <div className="text-xs font-sans uppercase tracking-widest text-gray-500 mb-2">Level 1</div>
                <div className="font-bold text-white text-lg">Low Resource</div>
                <div className="text-sm mt-2 text-gray-400">Qwen 3 8B [10], Apriel-1.5-15b-Thinker [11] (4-bit Quantized)</div>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <div className="text-xs font-sans uppercase tracking-widest text-blue-400 mb-2">Level 2</div>
                <div className="font-bold text-white text-lg">Strong Baseline</div>
                <div className="text-sm mt-2 text-gray-400">DeepSeek V3.2 [12] (API)</div>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                <div className="text-xs font-sans uppercase tracking-widest text-amber-400 mb-2">Level 3</div>
                <div className="font-bold text-white text-lg">Efficient SOTA</div>
                <div className="text-sm mt-2 text-gray-400">Google Gemini 3.0 Flash [13]</div>
            </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
            For Level 3, the version without extended reasoning activation (No reasoning) was used to evaluate the model's "intuitive" abilities on a large sample.
        </p>
      </section>

      {/* 4. Experimental Results */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">4. Experimental Results</h2>

        {/* Stage 1 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.1 Stage 1: Local Quantized Models</h3>
        <p className="mb-6">
            Experiments with local models confirmed the hypothesis that their resources are insufficient for zero-shot psychometrics. MBTI determination accuracy was <strong>~6%</strong> (random noise level), and Big5 metrics showed an F1-score of approximately 0%. Heavy quantization destroys the subtle semantic connections necessary for profiling.
        </p>

        {/* Stage 2 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.2 Stage 2: DeepSeek V3.2 (N=800)</h3>
        <p className="mb-4">The DeepSeek model showed significant results on the MBTI dataset:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-400">
            <li><strong>Exact Match</strong>: 52.50% (8 times higher than random guessing).</li>
            <li><strong>Best Axis</strong>: Intuition/Sensing (N/S) — 91.00%.</li>
        </ul>
        <p className="text-sm bg-red-900/10 border border-red-500/20 p-4 rounded text-red-200 mt-2">
            However, on the gender determination task (Personae), the model showed a result of 32.41%, which is worse than random, indicating an inversion or systematic prompting error.
        </p>

        {/* Stage 3 */}
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">4.3 Stage 3: Gemini 3.0 Flash (N=800)</h3>
        <p className="mb-4">
            Large-scale testing of the Gemini 3.0 Flash model revealed high performance on classic MBTI tasks but also highlighted generalization issues across different domains.
        </p>

        <TableContainer>
            <thead className="bg-gradient-to-r from-amber-900/30 to-transparent">
                <tr>
                    <Th>Metric</Th>
                    <Th>DeepSeek V3.2</Th>
                    <Th>Gemini 3.0 Flash</Th>
                    <Th>Gain</Th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Td className="font-medium text-white">Exact Match Accuracy</Td>
                    <Td>52.50%</Td>
                    <Td className="text-amber-400 font-bold">71.88%</Td>
                    <Td className="text-green-400">+19.38%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (I)E (Introversion)</Td>
                    <Td>85.50%</Td>
                    <Td className="text-amber-400 font-bold">91.38%</Td>
                    <Td className="text-green-400">+5.88%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (N)S (Intuition)</Td>
                    <Td>91.00%</Td>
                    <Td className="text-amber-400 font-bold">94.00%</Td>
                    <Td className="text-green-400">+3.00%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (T)F (Logic/Ethics)</Td>
                    <Td>76.62%</Td>
                    <Td className="text-amber-400 font-bold">89.00%</Td>
                    <Td className="text-green-400">+12.38%</Td>
                </tr>
                <tr>
                    <Td className="font-medium text-white">Axis (J)P (Rat./Irrat.)</Td>
                    <Td>76.88%</Td>
                    <Td className="text-amber-400 font-bold">84.25%</Td>
                    <Td className="text-green-400">+7.37%</Td>
                </tr>
            </tbody>
        </TableContainer>
        
        <p className="text-sm text-gray-500 mt-4 mb-6">
            <em>Note:</em> The 94% result on the (N)S scale is unprecedentedly high for a zero-shot method, indicating that the distinction between abstract and concrete speech styles is the most "readable" signal for LLMs.
        </p>

        <h4 className="text-lg font-sans font-bold text-white mt-6 mb-2">Big5 Results (Essays)</h4>
        <p className="mb-4">
            On the essay corpus, the model showed moderate results (Accuracy ~58-60% for binary trait classification), which only slightly exceeds the random level (50%).
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-400">
            <li><strong>Best Indicator:</strong> Extraversion (Big5_E) — 59.88% (F1: 0.68).</li>
            <li><strong>Worst Indicator:</strong> Conscientiousness (Big5_C) — 58.50% (F1: 0.41).</li>
        </ul>

        <h4 className="text-lg font-sans font-bold text-white mt-6 mb-2">Domain Transfer Problem (Personae Corpus)</h4>
        <div className="bg-white/5 p-4 rounded border border-white/10">
            <p className="mb-2">
                On the Personae dataset (N=145), the model showed unexpectedly low results:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
                <li>Gender Accuracy: <strong>40.00%</strong> (worse than random).</li>
                <li>MBTI Exact Match: <strong>10.34%</strong>.</li>
            </ul>
            <p className="text-sm text-gray-500">
                This indicates a strong <em>Domain Shift</em> effect. The gender result (40%) confirms the hypothesis of anti-correlation or false triggering of few-shot examples in the prompt (priming bias), previously observed in DeepSeek.
            </p>
        </div>
      </section>

      {/* 5. Discussion */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">5. Discussion</h2>
        
        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">5.1 Scaling Effect and Accuracy</h3>
        <p className="mb-4">
            Gemini 3.0 Flash, even without activating the reasoning module, significantly outperforms "strong baselines." An accuracy of nearly 72% on a 16-class classification task (random chance 6.25%) proves that modern models possess a deep implicit understanding of psychotypes.
        </p>
        <p className="mb-4">
            The difference in axes is particularly notable:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>(N)S and (I)E</strong> are encoded through vocabulary (word choice, pronouns, abstractions) and are read with &gt;90% accuracy.</li>
            <li><strong>(J)P</strong> (planning/spontaneity) is encoded through narrative structure and is harder to read (84%).</li>
        </ul>

        <h3 className="text-xl font-sans font-semibold text-white mt-8 mb-4">5.2 Limitations and Ethics</h3>
        <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r">
            <p>
                The high accuracy (71.88%) on a popular dataset raises privacy questions. The model is capable of compiling an accurate psychological profile of a user based on their message history. However, low results on the Personae dataset show that this ability is not yet universal and depends heavily on the style of the training data.
            </p>
        </div>
      </section>

      {/* 6. Conclusion */}
      <section className="mb-12">
        <h2 className="text-3xl font-sans font-bold text-white mb-6 border-b border-white/10 pb-2">6. Conclusion</h2>
        <p className="mb-4">
            The study on a sample of N=800 confirmed that the Gemini 3.1 Flash Lite model is capable of effectively solving psychometric tasks. We observe a qualitative leap: the model "sees" psychological axes with an accuracy approaching the reliability of psychological tests themselves.
        </p>
        <p className="mb-4">
            <strong>Future Work:</strong> In this study, we treated models as "black boxes." A promising direction is the transition to Mechanistic Interpretability methods. We plan to use Probing Classifiers and Sparse Autoencoders to analyze the open weights of models to find specific neurons and directions in the latent space responsible for encoding the identified psychological features.
        </p>
        <p className="mt-8">
            <strong>Data Availability:</strong> The full source code of the pipelines, prompts used, and logs (DeepSeek, Gemini, Qwen, Apriel) are published in an open repository: <a href="https://github.com/Timur-marii8st/LLM-ZeroShot-Psychometrics/tree/main" className="text-blue-400 hover:text-blue-300 underline">GitHub Repository</a>
        </p>
      </section>

      {/* References */}
      <section className="pt-12 mt-12 border-t border-white/10">
        <h3 className="text-xl font-sans font-bold text-white mb-6">References</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-500 font-sans">
            <li>Premack, D., & Woodruff, G. (1978). Does the chimpanzee have a theory of mind? <em>Behavioral and brain sciences</em>.</li>
            <li>Park, K., et al. (2023). The Linear Representation Hypothesis and the Geometry of Large Language Models. <em>arXiv</em>.</li>
            <li>Vaswani, A., et al. (2017). Attention is all you need. <em>arXiv</em>.</li>
            <li>Ju, T., et al. (2025). Probing then Editing Response Personality of Large Language Models. <em>arXiv</em>.</li>
            <li>Kaggle. Mbti-type dataset. <a href="https://www.kaggle.com/datasets/datasnaek/mbti-type" className="hover:text-blue-400 underline">Link</a></li>
            <li>Jing Jie, Tan. (2024). essays-big5 dataset. <em>Hugging Face</em>.</li>
            <li>Luyckx, K., & Daelemans, W. (2013). Personae corpus.</li>
            <li>Hendrycks, D., et al. (2020). Measuring massive multitask language understanding. <em>arXiv</em>.</li>
            <li>Wang, Y., et al. (2024). MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark.</li>
            <li>Qwen Team. (2025). Qwen3 Technical Report. <em>arXiv</em>.</li>
            <li>Apriel AI. (2025). Apriel-1.5-15b-Thinker. <em>arXiv</em>.</li>
            <li>DeepSeek AI. (2025). DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models. <em>arXiv</em>.</li>
            <li>DeepMind. (2025). Gemini-3 Flash model card.</li>
        </ol>
      </section>

    </article>
  );
};

export default PsychProfilingPaper;